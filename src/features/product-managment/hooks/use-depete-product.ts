import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import {
  deleteProductRequest,
} from "../api/product-managment.api";

export const useDeleteProduct =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        deleteProductRequest,

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