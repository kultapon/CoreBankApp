import { useQuery } from "@tanstack/react-query";

import { getUsdPriceRequest } from "../api/products.api";

export const useUsdPrice = (
  productId: number | null,
  enabled?: boolean,
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

    enabled: enabled !== undefined 
      ? enabled && productId !== null
      : productId !== null,
  });
};