import { User } from "@/types";
import { axiosInstance } from "@/utils/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { useQuery } from "react-query";

const apiAuthenticate = async () => {
  const response = await axiosInstance.get(
    "//localhost:3001/auth/authenticate",
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const useAPIAuthenticate = (
  mutationOptions?: UseMutationOptions<
    Partial<User>,
    AxiosError,
    unknown,
    unknown
  >
) => {
  return useMutation<Partial<User>, AxiosError>(
    apiAuthenticate,
    mutationOptions
  );
};

export const useQueryAPIAuthenticate = () => {
  return useQuery<User, AxiosError>("apiAuthenticate", () => apiAuthenticate());
};
