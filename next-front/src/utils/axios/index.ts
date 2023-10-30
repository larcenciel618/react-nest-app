import axios from "axios";

const tokenString = (): string => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("userToken");
    console.log("localStorage.getItem: ", token);
    return localStorage.getItem("userToken") || "";
  }
  return "";
};

const baseURL = "http://localhost:3000/v2";

export const jwtJsonHeader = {
  Authorization: `Bearer ${tokenString()}`,
  "Content-Type": "application/json",
};

export const jsonHeader = {
  "Content-Type": "application/json",
};

//最初にインストールしたバージョン
// "axios": "^1.5.1",

export const axiosInstance = axios.create({ baseURL });
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.headers = jwtJsonHeader;
// axiosInstance.defaults.headers.options = { "Content-Type": "application/json" };
// axiosInstance.defaults.headers.options.Authorization = `Bearer ${tokenString()}`;
