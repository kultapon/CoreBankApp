import { apiClient } from "@/shared/api/client";

import type { User } from "@/entities/user/model/user.types";

import type { PaginatedResponse } from "@/entities/product/model/product.types";

export interface GetUsersParams {
  sort_by?: "id" | "username" | "created_at";

  order?: "asc" | "desc";

  include_banned?: boolean;

  page?: number;

  size?: number;
}

export interface CreateUserPayload {
  username: string;

  password: string;

  role:
    | "user"
    | "moderator"
    | "admin";
}

export interface BanUserPayload {
  ban_reason: string;
}

export interface ChangePasswordPayload {
  new_password: string;
}

export const getUsersRequest =
  async (
    params: GetUsersParams,
  ): Promise<
    PaginatedResponse<User>
  > => {
    const response =
      await apiClient.get(
        "/admin/users",
        {
          params,
        },
      );

    return response.data;
  };

export const createUserRequest =
  async (
    data: CreateUserPayload,
  ): Promise<User> => {
    const response =
      await apiClient.post(
        "/admin/users",
        data,
      );

    return response.data;
  };

export const banUserRequest =
  async (
    userId: number,
    data: BanUserPayload,
  ): Promise<void> => {
    await apiClient.patch(
      `/admin/users/ban/${userId}`,
      data,
    );
  };

export const unbanUserRequest =
  async (
    userId: number,
  ): Promise<void> => {
    await apiClient.patch(
      `/admin/users/unban/${userId}`,
    );
  };

export const changePasswordRequest =
  async (
    userId: number,
    data: ChangePasswordPayload,
  ): Promise<void> => {
    await apiClient.patch(
      `/admin/users/${userId}`,
      data,
    );
  };

export const deleteUserRequest =
  async (
    userId: number,
  ): Promise<void> => {
    await apiClient.delete(
      `/admin/users/${userId}`,
    );
  };