import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  unbanUserRequest,
} from "@/features/user-managment/api/user-managment.api";

export const useUnbanUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unbanUserRequest,

    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousUsers = queryClient.getQueriesData({ queryKey: ["users"] });

      queryClient.setQueriesData(
        { queryKey: ["users"] },
        (old: unknown) => {
          if (!old || typeof old !== "object") return old;
          const data = old as { items?: Array<{ id: number; banned_at: string | null }> };
          if (!data.items) return old;
          return {
            ...data,
            items: data.items.map((user) =>
              user.id === userId ? { ...user, banned_at: null } : user
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