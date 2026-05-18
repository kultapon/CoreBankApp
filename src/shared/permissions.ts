import type { User } from "@/features/auth/types/auth.types";

export const isAdmin = (
  user: User | null,
) => {
  return user?.role === "admin";
};

export const isModerator = (
  user: User | null,
) => {
  return (
    user?.role ===
    "moderator"
  );
};

export const canSeeSpecialNote = (
  user: User | null,
) => {
  return (
    user?.role ===
      "moderator" ||
    user?.role === "admin"
  );
};

export const canManageProducts = (
  user: User | null,
) => {
  return (
    user?.role ===
      "moderator" ||
    user?.role === "admin"
  );
};

export const canManageUsers = (
  user: User | null,
) => {
  return user?.role === "admin";
};