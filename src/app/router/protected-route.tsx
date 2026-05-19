import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "@/features/auth/store/auth.store";

export const ProtectedRoute = () => {
  const user = useAuthStore(
    (state) => state.user,
  );

  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Redirect admin from root to admin page
  if (user.role === "admin" && location.pathname === "/") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};