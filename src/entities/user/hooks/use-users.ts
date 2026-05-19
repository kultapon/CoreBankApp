import { useQuery } from "@tanstack/react-query";

import {
  getUsersRequest,
  type GetUsersParams,
} from "@/features/user-managment/api/user-managment.api";

export const useUsers = (
  params: GetUsersParams,
) => {
  return useQuery({
    queryKey: [
      "users",
      params,
    ],

    queryFn: () =>
      getUsersRequest(
        params,
      ),
  });
};