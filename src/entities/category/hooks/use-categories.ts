import { useQuery } from "@tanstack/react-query";

import { getCategoriesRequest } from "../api/categories.api";

export const useCategories =
  () => {
    return useQuery({
      queryKey: [
        "categories",
      ],

      queryFn:
        getCategoriesRequest,
    });
  };