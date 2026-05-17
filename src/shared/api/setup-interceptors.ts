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
  apiClient.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization =
                `Bearer ${token}`;

              return apiClient(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;

        isRefreshing = true;

        try {
          const refreshToken =
            tokenStorage.getRefreshToken();

          if (!refreshToken) {
            throw new Error("No refresh token");
          }

          const tokens = await refreshRequest(
            refreshToken,
          );

          tokenStorage.setAccessToken(
            tokens.access_token,
          );

          tokenStorage.setRefreshToken(
            tokens.refresh_token,
          );

          processQueue(null, tokens.access_token);

          originalRequest.headers.Authorization =
            `Bearer ${tokens.access_token}`;

          return apiClient(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);

          tokenStorage.clear();

          window.location.href = "/login";

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
};