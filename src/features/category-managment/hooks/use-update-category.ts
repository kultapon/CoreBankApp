import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import {
  updateCategoryRequest,
} from "../api/category-managment.api";

export const useUpdateCategory =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: ({
        categoryId,
        data,
      }: {
        categoryId: number;

        data: {
          name: string;
        };
      }) =>
        updateCategoryRequest(
          categoryId,
          data,
        ),

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