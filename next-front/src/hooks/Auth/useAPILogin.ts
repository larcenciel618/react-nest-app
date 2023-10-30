import { User } from "@/types";
import { axiosInstance, jsonHeader } from "@/utils/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

export type LoginRequest = {
  email: string;
  password: string;
};

const login = async (values: LoginRequest): Promise<Partial<User>> => {
  console.log("hooks-running: ", values);
  const response = await axiosInstance.post(
    "//localhost:3001/auth/login",
    values,
    {
      headers: jsonHeader,
      withCredentials: true,
    }
  );
  return response.data;
};
export const useAPILogin = (
  mutationOptions?: UseMutationOptions<
    Partial<User>,
    AxiosError,
    LoginRequest,
    unknown
  >
) => {
  return useMutation<Partial<User>, AxiosError, LoginRequest>(
    login,
    mutationOptions
  );
};
