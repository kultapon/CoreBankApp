import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import {
  updateProductRequest,
} from "../api/product-managment.api";

export const useUpdateProduct =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: ({
        productId,
        data,
      }: {
        productId: number;

        data: any;
      }) =>
        updateProductRequest(
          productId,
          data,
        ),

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "products",
            ],
          },
        );
      },
    });
  };