import { useQuery } from "@tanstack/react-query";

import { getUsdPriceRequest } from "../api/products.api";

export const useUsdPrice = (
  productId: number,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: [
      "usd-price",
      productId,
    ],

    queryFn: () =>
      getUsdPriceRequest(
        productId,
      ),

    enabled,

    staleTime: 1000 * 60 * 5,
  });
};