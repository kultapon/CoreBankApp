import { apiClient } from "../../../shared/api/client";

import type {
  PaginatedResponse,
  Product,
} from "../model/product.types";

export interface GetProductsParams {
  q?: string;

  category_id?: number;

  sort_by?: string;

  order?: "asc" | "desc";

  page?: number;

  size?: number;
}

export const getProductsRequest =
  async (
    params: GetProductsParams,
  ): Promise<
    PaginatedResponse<Product>
  > => {
    const response =
      await apiClient.get(
        "/products",
        {
          params,
        },
      );

    return response.data;
  };

  export interface UsdPriceResponse {
  price_rub: string;

  usd_rate: string;

  price_usd: string;
}

export const getUsdPriceRequest =
  async (
    productId: number,
  ): Promise<UsdPriceResponse> => {
    const response =
      await apiClient.get(
        `/products/usd-price/${productId}`,
      );

    return response.data;
  };