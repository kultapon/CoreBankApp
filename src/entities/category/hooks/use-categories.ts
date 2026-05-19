import { useQuery } from "@tanstack/react-query";

import { getAllCategoriesRequest } from "../api/categories.api";

export const useCategories =
  () => {
    return useQuery({
      queryKey: [
        "categories",
      ],

      queryFn:
        getAllCategoriesRequest,
    });
  };