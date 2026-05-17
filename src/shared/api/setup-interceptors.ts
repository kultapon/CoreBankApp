import { AxiosError } from "axios";

import { apiClient } from "./client";

import { refreshRequest } from "../../features/auth/api/auth.api";

import { tokenStorage } from "../../features/auth/token.storage";

let isRefreshing = false;

let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (
  error: unknown,
  token: string | null = null,
) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

export const setupInterceptors = () => {
  apiClient.interceptors.request.use(
    (config) => {
      const accessToken =
        tokenStorage.getAccessToken();

      if (accessToken) {
        config.headers.Authorization =
          `Bearer ${accessToken}`;
      }

      return config;
    },
  );

  apiClient.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
      const originalRequest =
        error.config as typeof error.config & {
          _retry?: boolean;
        };

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry
      ) {
        if (isRefreshing) {
          return new Promise<string>(
            (resolve, reject) => {
              failedQueue.push({
                resolve,
                reject,
              });
            },
          )
            .then((token) => {
              if (
                originalRequest.headers
              ) {
                originalRequest.headers.Authorization =
                  `Bearer ${token}`;
              }

              return apiClient(
                originalRequest,
              );
            })
            .catch((err) =>
              Promise.reject(err),
            );
        }

        originalRequest._retry = true;

        isRefreshing = true;

        try {
          const refreshToken =
            tokenStorage.getRefreshToken();

          if (!refreshToken) {
            throw new Error(
              "No refresh token",
            );
          }

          const tokens =
            await refreshRequest(
              refreshToken,
            );

          tokenStorage.setAccessToken(
            tokens.access_token,
          );

          tokenStorage.setRefreshToken(
            tokens.refresh_token,
          );

          processQueue(
            null,
            tokens.access_token,
          );

          if (
            originalRequest.headers
          ) {
            originalRequest.headers.Authorization =
              `Bearer ${tokens.access_token}`;
          }

          return apiClient(
            originalRequest,
          );
        } catch (refreshError) {
          processQueue(
            refreshError,
            null,
          );

          tokenStorage.clear();

          window.location.href =
            "/login";

          return Promise.reject(
            refreshError,
          );
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
};