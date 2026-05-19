import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  banUserRequest,
} from "@/features/user-managment/api/user-managment.api";

export const useBanUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      ban_reason,
    }: {
      userId: number;
      ban_reason: string;
    }) =>
      banUserRequest(userId, {
        ban_reason,
      }),

    onMutate: async ({ userId }) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousUsers = queryClient.getQueriesData({ queryKey: ["users"] });

      queryClient.setQueriesData(
        { queryKey: ["users"] },
        (old: unknown) => {
          if (!old || typeof old !== "object") return old;
          const data = old as { items?: Array<{ id: number; is_banned: boolean }> };
          if (!data.items) return old;
          return {
            ...data,
            items: data.items.map((user) =>
              user.id === userId ? { ...user, is_banned: true } : user
            ),
          };
        }
      );

      return { previousUsers };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousUsers) {
        context.previousUsers.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};