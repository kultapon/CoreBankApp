import { apiClient } from "./client";
import { tokenStorage } from "../../features/auth/token.storage";

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});