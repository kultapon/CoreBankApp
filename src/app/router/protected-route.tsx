import {
  Navigate,
} from "react-router-dom";

import type {
  PropsWithChildren,
} from "react";

import { useAuthStore } from "../../features/auth/store/auth.store";

export const ProtectedRoute = ({
  children,
}: PropsWithChildren) => {
  const user = useAuthStore(
    (state) => state.user,
  );

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
};