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

            navigate("/");
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
    <div>
      <input
        value={username}
        onChange={(e) =>
          setUsername(
            e.target.value,
          )
        }
        placeholder="username"
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
      />

      <button
        type="button"
        onClick={handleLogin}
        disabled={
          loginMutation.isPending
        }
      >
        Login
      </button>

      {loginMutation.isError && (
        <p>Login error</p>
      )}
    </div>
  );
};