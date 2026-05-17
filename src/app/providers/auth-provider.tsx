import {
  useEffect,
  useState,
} from "react";

import type {
  PropsWithChildren,
} from "react";

import {
  getMeRequest,
} from "../../features/auth/api/auth.api";

import { tokenStorage } from "../../features/auth/token.storage";

import { useAuthStore } from "../../features/auth/store/auth.store";

export const AuthProvider = ({
  children,
}: PropsWithChildren) => {
  const setUser = useAuthStore(
    (state) => state.setUser,
  );

  const logout = useAuthStore(
    (state) => state.logout,
  );

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const accessToken =
        tokenStorage.getAccessToken();

      if (!accessToken) {
        setIsLoading(false);

        return;
      }

      try {
        const user =
          await getMeRequest();

        setUser(user);
      } catch (error) {
        console.error(error);

        tokenStorage.clear();

        logout();
      } finally {
        setIsLoading(false);
      }
    };

    void initAuth();
  }, [logout, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
};