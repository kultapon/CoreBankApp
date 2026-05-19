import { Navigate } from "react-router-dom";

import { useState, useEffect } from "react";

import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/features/auth/store/auth.store";

import { useUsers } from "@/entities/user/hooks/use-users";

import { useBanUser } from "@/features/user-managment/hooks/use-ban-user";

import { useUnbanUser } from "@/features/user-managment/hooks/use-unban-user";

import { useDeleteUser } from "@/features/user-managment/hooks/use-delete-user";

import { ChangePasswordDialog } from "@/features/user-managment/ui/change-password-dialog";

import type { User } from "@/entities/user/model/user.types";

export const AdminPage = () => {
  const currentUser =
    useAuthStore(
      (state) => state.user,
    );

  const [page, setPage] =
    useState(1);

  const [includeBanned, setIncludeBanned] =
    useState(true);

  const [localUsers, setLocalUsers] = useState<User[]>([]);

  const {
    data,
    isLoading,
  } = useUsers({
    page,
    size: 12,
    order: "desc",
    sort_by: "created_at",
    include_banned:
      includeBanned,
  });

  useEffect(() => {
    if (data?.items) {
      setLocalUsers(data.items);
    }
  }, [data]);

  const banMutation =
    useBanUser();

  const unbanMutation =
    useUnbanUser();

  const deleteMutation =
    useDeleteUser();

  useEffect(() => {
    if (banMutation.isSuccess) {
      setLocalUsers((prev) =>
        prev.map((user) =>
          user.id === banMutation.variables?.userId
            ? { ...user, is_banned: true }
            : user
        )
      );
    }
  }, [banMutation.isSuccess]);

  useEffect(() => {
    if (unbanMutation.isSuccess) {
      setLocalUsers((prev) =>
        prev.map((user) =>
          user.id === unbanMutation.variables
            ? { ...user, is_banned: false }
            : user
        )
      );
    }
  }, [unbanMutation.isSuccess]);

  if (
    currentUser?.role !==
    "admin"
  ) {
    return (
      <Navigate to="/" />
    );
  }

  if (isLoading && !localUsers.length) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">
          Admin panel
        </h1>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={
              includeBanned
            }
            onChange={(e) =>
              setIncludeBanned(
                e.target.checked,
              )
            }
          />

          Include banned
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {localUsers.map(
          (user) => (
            <Card
              key={user.id}
              className="space-y-4 p-4"
            >
              <div className="space-y-1">
                <div className="font-semibold">
                  {
                    user.username
                  }
                </div>

                <div className="text-sm text-slate-500">
                  Role:{" "}
                  {user.role}
                </div>

                <div className="text-sm">
                  Status:{" "}
                  {user.is_banned
                    ? "Banned"
                    : "Active"}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <ChangePasswordDialog user={user} />

                {user.is_banned ? (
                  <Button
                    variant="outline"
                    onClick={() =>
                      unbanMutation.mutate(
                        user.id,
                      )
                    }
                  >
                    Unban
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() =>
                      banMutation.mutate(
                        {
                          userId:
                            user.id,

                          ban_reason:
                            "Admin action",
                        },
                      )
                    }
                  >
                    Ban
                  </Button>
                )}

                <Button
                  variant="destructive"
                  onClick={() =>
                    deleteMutation.mutate(
                      user.id,
                    )
                  }
                >
                  Delete
                </Button>
              </div>
            </Card>
          ),
        )}
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() =>
            setPage(
              (prev) =>
                prev - 1,
            )
          }
        >
          Previous
        </Button>

        <div className="text-sm">
          Page {data?.page} of{" "}
          {data?.pages}
        </div>

        <Button
          variant="outline"
          disabled={
            page ===
            data?.pages
          }
          onClick={() =>
            setPage(
              (prev) =>
                prev + 1,
            )
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};