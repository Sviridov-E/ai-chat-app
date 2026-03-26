import type { AxiosInstance } from "axios";
import { getAccessToken } from "../tokens";
import { PATHS } from "../config";

export const attachTokenInterceptor = (instance: AxiosInstance) => {
	instance.interceptors.request.use(
		(request) => {
			const accessToken = getAccessToken();
			if (accessToken) request.headers.Authorization = `Bearer ${accessToken}`;
			return request;
		},
		(error) => {
			return Promise.reject(error);
		},
		{ runWhen: (config) => config?.url !== PATHS.LOGIN },
	);
};
