import { apiClient } from "@/shared/api/client";

import type {
  Product,
} from "@/entities/product/model/product.types";

export interface ProductPayload {
  name: string;

  description?: string;

  price_rub: number;

  common_note?: string;

  special_note?: string;

  category_id: number;
}

export const createProductRequest =
  async (
    data: ProductPayload,
  ): Promise<Product> => {
    const response =
      await apiClient.post(
        "/products",
        data,
      );

    return response.data;
  };

export const updateProductRequest =
  async (
    productId: number,
    data: ProductPayload,
  ): Promise<Product> => {
    const response =
      await apiClient.patch(
        `/products/${productId}`,
        data,
      );

    return response.data;
  };

export const deleteProductRequest =
  async (
    productId: number,
  ): Promise<void> => {
    await apiClient.delete(
      `/products/${productId}`,
    );
  };