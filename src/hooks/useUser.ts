import api from "@/services/api";
import useUserStore from "@/store/useUserStore";
import { UserType } from "@/types/user";
import { AxiosError } from "axios";
import useSWR from "swr";

interface ValuesType {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}

const useUser = (userId = "") => {
  const { userId: userIdStore } = useUserStore();
  const fetcher = (url: string) => api.get(url).then((resp) => resp.data);
  const { data, isLoading, mutate } = useSWR<UserType>(`/users/${userId}`, fetcher);

  const createUser = async (values: ValuesType) => {
    const user = {
      name: values.name,
      email: values.email,
      password: values.password
    }

    try {
      await api.post(`/users`, user);
      return { success: true, error: "" };
    } catch (e) {
      const err = e as AxiosError;
      if (err.request.status === 400) {
        return { success: false, error: "Usuário já cadastrado" };
      }
      return { success: false, error: "Server error" };
    }
  }

  const updateUser = async (userId: string, values: ValuesType) => {
    const user = {
      name: values.name,
      email: values.email,
      password: values.password
    }
    console.log(user)
    try {
      await api.put(`/users/${userId}`, user);
      mutate();
      return { success: true, error: "" };
    } catch (e) {
      const err = e as AxiosError;
      return { success: false, error: "Server error" };
    }
  }

  const deleteUser = async () => {
    try {
      await api.delete(`/users/${userIdStore}`);
      mutate();
      return { success: true, error: "" };
    } catch (e) {
      const err = e as AxiosError;
      if (err.request.status === 400) {
        return { success: false, error: "Usuário não encontrado" };
      }
      return { success: false, error: "Server error" };
    }
  }

  return { data, isLoading, mutate, createUser, updateUser, deleteUser }
}

export default useUser;