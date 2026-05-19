import type { User } from "@/features/auth/types/auth.types";

import type { Product } from "../entities/product/model/product.types";


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

export const canEditProduct =
  (
    user: User | null,
    product: Product,
  ) => {
    if (!user) {
      return false;
    }

    if (
      user.role ===
      "moderator"
    ) {
      return true;
    }

    return (
      product.creator.id ===
      user.id
    );
  };

export const canDeleteProduct =
  (
    user: User | null,
  ) => {
    if (!user) {
      return false;
    }

    return (
      user.role ===
      "moderator"
    );
  };