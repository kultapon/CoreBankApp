import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useLogin } from "../features/auth/hooks/use-login";

import {
  getMeRequest,
} from "../features/auth/api/auth.api";

import { tokenStorage } from "../features/auth/token.storage";

import { useAuthStore } from "../features/auth/store/auth.store";

export const LoginPage = () => {
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const setUser = useAuthStore(
    (state) => state.setUser,
  );

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const getErrorMessage = (error: unknown) => {
    if (
      error &&
      typeof error === "object" &&
      "response" in error
    ) {
      const axiosError = error as {
        response?: {
          status: number;
          data?: {
            message?: string;
            detail?: string;
          };
        };
      };

      if (axiosError.response?.status === 422) {
        return null;
      }

      return (
        axiosError.response?.data?.message ||
        axiosError.response?.data?.detail ||
        null
      );
    }
    return null;
  };

  const handleLogin = () => {
    loginMutation.mutate(
      {
        username,
        password,
      },

      {
        onSuccess: async (data) => {
          try {
            tokenStorage.setAccessToken(
              data.access_token,
            );

            tokenStorage.setRefreshToken(
              data.refresh_token,
            );

            const user =
              await getMeRequest();

            setUser(user);

            if (
                user.role ===
                "admin"
              ) {
                  navigate("/admin", { replace: true });
            } else {
                  navigate("/", { replace: true });
            }
            
          } catch (error) {
            console.error(error);
          }
        },

        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  return (
  <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">
        Login
      </h1>

      <input
        value={username}
        onChange={(e) =>
          setUsername(
            e.target.value,
          )
        }
        placeholder="username"
        className="mb-3 w-full rounded border p-2"
      />

      <input
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value,
          )
        }
        placeholder="password"
        className="mb-4 w-full rounded border p-2"
      />

      <button
        type="button"
        onClick={handleLogin}
        disabled={
          loginMutation.isPending
        }
        className="w-full rounded bg-black p-2 text-white"
      >
        Login
      </button>

      {loginMutation.isError && (
        <p className="mt-3 text-red-500">
          {getErrorMessage(loginMutation.error) || "Login error"}
        </p>
      )}
    </div>
  </div>
);
}