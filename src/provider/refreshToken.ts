import { AxiosError } from "axios";
import { destroyCookie, setCookie } from "nookies";

import api from "@/services/api";
import Router from "next/router";

async function refreshToken(refreshToken: string) {
  try {
    const data = await api.post("/users/refresh-token", { refreshToken }).then(resp => resp.data);

    if (data.refreshToken) {
      destroyCookie(undefined, 'nexttodo.refreshToken');

      setCookie(undefined, 'nexttodo.refreshToken', data.refreshToken.id, {
        maxAge: 60 * 60 * 1 // 1 hour
      });
    }

    setCookie(undefined, 'nexttodo.token', data.token, {
      maxAge: 20 // 20 seconds
    });

    return data.token;
  } catch (e) {
    const err = e as AxiosError
    if (err.response?.status == 400) {
      destroyCookie(undefined, 'nexttodo.token');
      destroyCookie(undefined, 'nexttodo.refreshToken');

      Router.push("/");
    }

    return undefined;
  }
}

export default refreshToken;