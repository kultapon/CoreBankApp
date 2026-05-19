import { Navigate } from "react-router-dom";

import { useState } from "react";

import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/features/auth/store/auth.store";

import { useUsers } from "@/entities/user/hooks/use-users";

import { useBanUser } from "@/features/user-managment/hooks/use-ban-user";

import { useUnbanUser } from "@/features/user-managment/hooks/use-unban-user";

import { useDeleteUser } from "@/features/user-managment/hooks/use-delete-user";

import { ChangePasswordDialog } from "@/features/user-managment/ui/change-password-dialog";

export const AdminPage = () => {
  const currentUser =
    useAuthStore(
      (state) => state.user,
    );

  const [page, setPage] =
    useState(1);

  const [includeBanned, setIncludeBanned] =
    useState(true);

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

  const banMutation =
    useBanUser();

  const unbanMutation =
    useUnbanUser();

  const deleteMutation =
    useDeleteUser();

  if (
    currentUser?.role !==
    "admin"
  ) {
    return (
      <Navigate to="/" />
    );
  }

  if (isLoading) {
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
        {data?.items.map(
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