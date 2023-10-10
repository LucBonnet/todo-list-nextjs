import Router from 'next/router';
import { create, } from "zustand";
import { parseCookies, setCookie, destroyCookie } from "nookies";

import api, { apiToken } from "@/services/api";
import useUserStore from '@/store/useUserStore';

interface UserType {
  name: string,
  email: string,
}

interface AuthContextType {
  isAutehnticated: boolean,
  user: UserType | null,
  signIn: (data: SignInData) => Promise<void>
  signOut: () => void
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

  apiToken.defaults.headers["Authorization"] = `Bearer ${token}`;

  set(() => {
    return {
      isAutehnticated: true,
      user
    }
  });

  Router.push("/tasks");
}

function signout(set: any) {
  destroyCookie(undefined, 'nexttodo.token');

  set(() => {
    return {
      isAutehnticated: false,
      user: null
    }
  });

  Router.push("/");
}

function autoAuth(set: any) {
  const { 'nexttodo.token': token } = parseCookies();

  if (token) {
    api.post(`/users/info`, { token })
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
    signOut: () => signout(set)
  }
});