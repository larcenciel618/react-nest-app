import axios, { AxiosError } from "axios";
import { User } from "../../types";
import { UseQueryOptions, useQuery } from "react-query";
import { axiosInstance, jwtJsonHeader } from "@/utils/axios";

const getAllUsers = async () => {
  const res = await axiosInstance.get("//localhost:3001/user", {
    headers: jwtJsonHeader,
  });
  console.log("res-in-hooks: ", res.data);
  return res.data;
};

export const useAPIGetAllUsers = (
  queryOptions?: UseQueryOptions<User[], AxiosError>
) => {
  return useQuery<User[], AxiosError>(
    "getAllUsers",
    () => getAllUsers(),
    queryOptions
  );
};
