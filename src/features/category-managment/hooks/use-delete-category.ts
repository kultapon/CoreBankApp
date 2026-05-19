import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import {
  deleteCategoryRequest,
} from "../api/category-managment.api";

export const useDeleteCategory =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        deleteCategoryRequest,

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