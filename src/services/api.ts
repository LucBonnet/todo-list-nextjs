import axios from "axios";
import { parseCookies } from "nookies";

const { 'nexttodo.token': token } = parseCookies();

const api = axios.create({
  baseURL: "http://localhost:3333",
})

export const apiToken = api;

if (token) {
  apiToken.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export default api;