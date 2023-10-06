import api from "@/services/api";
import useUserStore from "@/store/useUserStore";
import { FaxOutlined } from "@mui/icons-material";
import { AxiosError } from "axios";

interface ValuesType {
  email: string,
  password: string,
  rememberLogin: boolean
}

const useLogin = () => {
  const { userId, setUserId } = useUserStore();

  const login = async (values: ValuesType) => {
    try {
      const user = await api.post(`/users/auth`, values).then((res) => res.data);
      if (user) setUserId(user.id);

      if (values.rememberLogin) {
        window.localStorage.setItem("user", user.id);
      }

      return { success: true, error: "" };
    } catch (e) {
      const err = e as AxiosError;
      if (err.request.status === 404) {
        return { success: false, error: "E-mail ou senha incorretos" }
      }
    }
  }

  const auth = async () => {
    const user_id = localStorage.getItem("user");
    const user = await api.get(`/users/${user_id}`).then((resp) => resp.data);
    if (user) {
      setUserId(user.id);
      return user.id;
    }

    return "";
  }

  const logout = () => {
    window.localStorage.removeItem("user");
    setUserId("");
  }

  return { login, auth, logout }
}

export default useLogin;