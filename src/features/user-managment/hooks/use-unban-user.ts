import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  unbanUserRequest,
} from "@/features/user-managment/api/user-managment.api";

export const useUnbanUser =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        unbanUserRequest,

      onSuccess:
        async () => {
          await queryClient.invalidateQueries(
            {
              queryKey: [
                "users",
              ],
            },
          );

          await queryClient.refetchQueries(
            {
              queryKey: [
                "users",
              ],
            },
          );
        },
    });
  };