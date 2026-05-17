import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useLogin } from "../features/auth/hooks/use-login";

import { tokenStorage } from "../features/auth/token.storage";

export const LoginPage = () => {
  const navigate = useNavigate();

  const loginMutation = useLogin();

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
        onSuccess: (data) => {
          tokenStorage.setAccessToken(
            data.access_token,
          );

          tokenStorage.setRefreshToken(
            data.refresh_token,
          );

          navigate("/");
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
          setUsername(e.target.value)
        }
        placeholder="username"
      />

      <input
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        placeholder="password"
      />

      <button
        onClick={handleLogin}
        disabled={loginMutation.isPending}
      >
        Login
      </button>

      {loginMutation.isError && (
        <p>Login error</p>
      )}
    </div>
  );
};