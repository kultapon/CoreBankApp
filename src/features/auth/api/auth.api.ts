import { apiClient } from "../../../shared/api/client";

export interface LoginDto {
  username: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export const loginRequest = async (
  data: LoginDto,
): Promise<TokenResponse> => {
  const response = await apiClient.post(
    "/auth_users/login",
    data,
  );

  return response.data;
};

export const refreshRequest = async (
  refreshToken: string,
): Promise<TokenResponse> => {
  const response = await apiClient.post(
    "/auth_users/refresh",
    null,

    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  return response.data;
};