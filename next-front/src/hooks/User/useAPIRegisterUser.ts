import axios, { AxiosError } from "axios";
// import { useMutation, UseMutationOptions } from "react-query";
// import { RegisterUserForAdminURL } from "src/utils/url/user.url";
import { User } from "../../types";
import { UseMutationOptions, useMutation } from "react-query";
import { axiosInstance, jsonHeader } from "@/utils/axios";

export type RegisterUserDto = {
  lastName: string;
  firstName: string;
};

const registerUser = async (data: RegisterUserDto) => {
  //   const res = await axiosInstance.post(RegisterUserForAdminURL, data);
  console.log("RegisterUserDto: ", data);
  const res = await axiosInstance.post(
    "//localhost:3001/user",
    { ...data },
    { headers: jsonHeader }
  );
  console.log("res-in-hooks: ", res.data);
  return res.data;
};

export const useAPIRegisterUser = (
  mutationOptions?: UseMutationOptions<
    User,
    AxiosError,
    RegisterUserDto,
    unknown
  >
) => {
  return useMutation<User, AxiosError, RegisterUserDto>(
    (dto) => registerUser(dto),
    mutationOptions
  );
};
