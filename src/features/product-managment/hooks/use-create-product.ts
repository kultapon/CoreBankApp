import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import {
  createProductRequest,
} from "../api/product-managment.api";

export const useCreateProduct =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        createProductRequest,

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