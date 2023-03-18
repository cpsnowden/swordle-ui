import axios from "axios";
import { API_URL } from "config";

export const axiosClient = axios.create({
  baseURL: API_URL,
});
