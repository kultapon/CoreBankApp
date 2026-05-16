import { apiClient } from "../../../shared/api/client";
import type {
  LoginRequest,
  TokenResponse,
  User,
} from "../types/auth.types";

export const loginRequest = async (
  data: LoginRequest,
): Promise<TokenResponse> => {
  const response = await apiClient.post<TokenResponse>(
    "/auth_users/login",
    data,
  );

  return response.data;
};

export const refreshRequest = async (
  refreshToken: string,
): Promise<TokenResponse> => {
  const response = await apiClient.post<TokenResponse>(
    "/auth_users/refresh",
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  return response.data;
};

export const getMeRequest = async (): Promise<User> => {
  const response = await apiClient.get<User>("/users/me");

  return response.data;
};