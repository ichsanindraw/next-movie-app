import axios, { AxiosInstance } from "axios";
import { API_KEY, API_URL } from "../config/env";
import { REQUEST_TIMEOUT } from "@constant";

export const http: AxiosInstance = axios.create({
  baseURL: `${API_URL}/?apiKey=${API_KEY}`,
  timeout: REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});
