import axios from "axios";

const API_URL = "";

export const axiosClient = axios.create({
  baseURL: API_URL,
});
