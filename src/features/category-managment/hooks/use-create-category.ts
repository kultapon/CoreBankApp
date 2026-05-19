import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import {
  createCategoryRequest,
} from "../api/category-managment.api";

export const useCreateCategory =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        createCategoryRequest,

      onSuccess: async () => {
        await queryClient.invalidateQueries(
          {
            queryKey: [
              "categories",
            ],
          },
        );
      },
    });
  };