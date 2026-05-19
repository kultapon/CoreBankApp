import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteUserRequest,
} from "@/features/user-managment/api/user-managment.api";

export const useDeleteUser =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        deleteUserRequest,

      onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["users"],
          });
        },
    });
  };