import { apiClient } from "@/shared/api/client";

import type {
  CategoriesResponse,
} from "../types/category.types";

export const getCategoriesRequest =
  async (): Promise<CategoriesResponse> => {
    const response =
      await apiClient.get(
        "/categories",
      );

    return response.data;
  };