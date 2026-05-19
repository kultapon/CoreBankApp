import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  changePasswordRequest,
} from "@/features/user-managment/api/user-managment.api";

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      password,
    }: {
      userId: number;
      password: string;
    }) =>
      changePasswordRequest(userId, {
        password,
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      await queryClient.refetchQueries({
        queryKey: ["users"],
      });
    },
  });
};
