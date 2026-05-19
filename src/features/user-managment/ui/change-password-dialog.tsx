import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useChangePassword } from "../hooks/use-change-password";

import type { User } from "@/entities/user/model/user.types";

interface ChangePasswordDialogProps {
  user: User;
}

export const ChangePasswordDialog = ({
  user,
}: ChangePasswordDialogProps) => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");

  const changePasswordMutation = useChangePassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) return;

    changePasswordMutation.mutate(
      {
        userId: user.id,
        password,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setPassword("");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Change Password
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Change password for {user.username}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={!password.trim() || changePasswordMutation.isPending}
            >
              {changePasswordMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
