import Router from 'next/router';
import { create, } from "zustand";
import { parseCookies, setCookie } from "nookies";

import api from "@/services/api";
import { parseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

interface UserType {
  name: string,
  email: string,
}

interface AuthContextType {
  isAutehnticated: boolean,
  user: UserType | null,
  signIn: (data: SignInData) => Promise<void>
}

interface SignInData {
  email: string,
  password: string,
}

async function signIn(set: any, data: SignInData) {
  const { email, password } = data;
  const responseData = await api.post(`/users/signin`, { email, password }).then((res) => res.data);
  const { token, user } = responseData;

  setCookie(undefined, 'nexttodo.token', token, {
    maxAge: 60 * 60 * 1 // 1 hour
  });

  set(() => {
    return {
      isAutehnticated: true,
      user
    }
  });

  Router.push("/tasks");
}

function autoAuth(set: any) {
  const { 'nexttodo.token': token } = parseCookies();

  if (token) {
    api.get(`/users/info/${token}`)
      .then(resp => resp.data)
      .then((data) => {
        const { name, email } = data;

        set(() => {
          return {
            user: { name, email },
            isAutehnticated: true,
          }
        })
      });
  }
}

export const AuthContext = create<AuthContextType>((set) => {
  autoAuth(set);

  return {
    isAutehnticated: false,
    user: null,
    signIn: (data: SignInData) => signIn(set, data),
  }
});