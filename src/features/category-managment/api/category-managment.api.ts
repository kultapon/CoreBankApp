import { apiClient } from "@/shared/api/client";

import type {
  Category,
} from "@/entities/category/model/category.types";

export interface CategoryPayload {
  name: string;
}

export const createCategoryRequest =
  async (
    data: CategoryPayload,
  ): Promise<Category> => {
    const response =
      await apiClient.post(
        "/categories",
        data,
      );

    return response.data;
  };

export const updateCategoryRequest =
  async (
    categoryId: number,
    data: CategoryPayload,
  ): Promise<Category> => {
    const response =
      await apiClient.patch(
        `/categories/${categoryId}`,
        data,
      );

    return response.data;
  };

export const deleteCategoryRequest =
  async (
    categoryId: number,
  ): Promise<void> => {
    await apiClient.delete(
      `/categories/${categoryId}`,
    );
  };