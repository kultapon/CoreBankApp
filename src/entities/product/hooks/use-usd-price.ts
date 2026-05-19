import { useQuery } from "@tanstack/react-query";

import { getUsdPriceRequest } from "../api/products.api";

export const useUsdPrice = (
  productId: number | null,
) => {
  return useQuery({
    queryKey: [
      "usd-price",
      productId,
    ],

    queryFn: () =>
      getUsdPriceRequest(
        productId!,
      ),

    enabled:
      productId !== null,
  });
};