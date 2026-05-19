import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  banUserRequest,
} from "@/features/user-managment/api/user-managment.api";

export const useBanUser =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: ({
        userId,
        ban_reason,
      }: {
        userId: number;

        ban_reason: string;
      }) =>
        banUserRequest(
          userId,
          {
            ban_reason,
          },
        ),

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