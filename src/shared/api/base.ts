import axios from "axios";
import { attachTokenInterceptor } from "./interceptors/attachToken";
import { refreshInterceptor } from "./interceptors/refresh";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const apiInstance = axios.create({
	baseURL: API_URL,
});

[attachTokenInterceptor, refreshInterceptor].forEach((interceptor) =>
	interceptor(apiInstance),
);
