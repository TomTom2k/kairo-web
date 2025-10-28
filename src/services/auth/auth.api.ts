import axiosInstance from "@/lib/axiosConfig";

import { LoginApiType, RegisterApiType, GetMeApiType } from "./type";

type AuthApiType = {
  login: (
    payload: LoginApiType["request"]
  ) => Promise<LoginApiType["response"]>;
  register: (
    payload: RegisterApiType["request"]
  ) => Promise<RegisterApiType["response"]>;
  getMe: () => Promise<GetMeApiType["response"]>;
};

const REGISTER_URL = "/v1/auth/register";
const LOGIN_URL = "/v1/auth/login";
const GET_ME_URL = "/v1/auth/me";

export const authApi: AuthApiType = {
  login: async payload => {
    const response = await axiosInstance.post<LoginApiType["response"]>(
      LOGIN_URL,
      payload
    );
    return response.data;
  },
  register: async payload => {
    const response = await axiosInstance.post<RegisterApiType["response"]>(
      REGISTER_URL,
      payload
    );
    return response.data;
  },
  getMe: async () => {
    const response =
      await axiosInstance.get<GetMeApiType["response"]>(GET_ME_URL);
    return response.data;
  },
};
