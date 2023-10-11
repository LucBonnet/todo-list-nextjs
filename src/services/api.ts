import refreshToken from "@/provider/refreshToken";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { parseCookies, destroyCookie } from "nookies";

const { 'nexttodo.token': token } = parseCookies();

const api = axios.create({
  baseURL: "http://localhost:3333",
})

const apiToken = api;

apiToken.interceptors.response.use(config => {
  return config;
}, async (error: AxiosError) => {
  const originalRequest = error.config as AxiosRequestConfig;
  if (error.response?.status === 401) {
    const { ['nexttodo.refreshToken']: oldRefreshToken } = parseCookies(undefined);

    const newToken = await refreshToken(oldRefreshToken);

    if (newToken) {
      apiToken.defaults.headers["Authorization"] = `Bearer ${newToken}`;

      if (originalRequest.headers)
        originalRequest.headers.Authorization = `Bearer ${newToken}`
      else
        return Promise.reject(error);

      return apiToken(originalRequest);
    }

    destroyCookie(undefined, "nexttodo.token");
    destroyCookie(undefined, "nexttodo.refreshToken");

    return Promise.reject(error);
  }

  return Promise.reject(error);
})

if (token) {
  apiToken.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export { apiToken };

export default api;