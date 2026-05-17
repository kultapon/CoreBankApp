import { useMutation } from "@tanstack/react-query";

import {
  loginRequest,
  type LoginDto,
} from "../api/auth.api";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginDto) =>
      loginRequest(data),
  });
};