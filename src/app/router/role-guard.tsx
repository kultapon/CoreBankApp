import { Navigate } from "react-router-dom";

import { useAuthStore } from "../../features/auth/store/auth.store";

interface Props {
  roles: string[];
  children: React.ReactNode;
}

export const RoleGuard = ({
  roles,
  children,
}: Props) => {
  const user = useAuthStore(
    (state) => state.user,
  );

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return children;
};