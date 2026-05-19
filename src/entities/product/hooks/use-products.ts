import { useQuery } from "@tanstack/react-query";

import {
  getProductsRequest,
  type GetProductsParams,
} from "../api/products.api";

export const useProducts = (
  params: GetProductsParams,
) => {
  return useQuery({
    queryKey: [
      "products",
      params,
    ],

    queryFn: () =>
      getProductsRequest(params),
  });
};