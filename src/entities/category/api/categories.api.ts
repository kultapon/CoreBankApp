import { apiClient } from "@/shared/api/client";

import type {
  Category,
} from "../model/category.types";

export const getAllCategoriesRequest =
  async (): Promise<
    Category[]
  > => {
    const response =
      await apiClient.get(
        "/categories/all",
      );

    return response.data;
  };