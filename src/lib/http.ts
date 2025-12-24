import axios, { AxiosInstance } from "axios";
import { API_KEY, API_URL, REQUEST_TIMEOUT } from "../config/env";

export const http: AxiosInstance = axios.create({
  baseURL: `${API_URL}/?apiKey=${API_KEY}`,
  timeout: REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});
