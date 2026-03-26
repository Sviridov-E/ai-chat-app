import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { getRefreshToken } from "../tokens";
import { PATHS } from "../config";

const isAuthRequest = (url?: string) =>
	url === PATHS.LOGIN || url === PATHS.REFRESH;

export const refreshInterceptor = (instance: AxiosInstance) => {
	let isRefreshing = false;
	let promisesQueue: {
		res: (token: string) => void;
		rej: (error: unknown) => void;
	}[] = [];

	const processQueue = (error: unknown, token: string | null) => {
		promisesQueue.forEach((prom) => {
			if (error || !token)
				prom.rej(error || new Error("Ошибка при получении токена"));
			else prom.res(token);
		});
		promisesQueue = [];
	};

	instance.interceptors.response.use(
		(response) => response,
		async (error) => {
			if (!axios.isAxiosError(error) || !error.config) {
				return Promise.reject(error);
			}
			const originalRequest = error.config as InternalAxiosRequestConfig & {
				_retry: boolean;
			};

			if (
				error.response?.status === 401 &&
				!isAuthRequest(originalRequest?.url) &&
				originalRequest &&
				!originalRequest._retry
			) {
				if (isRefreshing) {
					return new Promise((res, rej) => {
						promisesQueue.push({ res, rej });
					})
						.then((token) => {
							originalRequest.headers.Authorization = `Bearer ${token}`;
							return instance(originalRequest);
						})
						.catch((err) => Promise.reject(err));
				}

				originalRequest._retry = true;
				isRefreshing = true;

				try {
					const { data } = await axios.post("/api/auth/refresh", {
						refreshToken: getRefreshToken(),
					});

					const newToken = data.accessToken;

					// ... save token in memory ...

					processQueue(null, newToken);
					originalRequest.headers.Authorization = `Bearer ${newToken}`;

					return instance(originalRequest);
				} catch (refreshError) {
					processQueue(refreshError, null);

					return Promise.reject(refreshError);
				} finally {
					isRefreshing = false;
				}
			}

			return Promise.reject(error);
		},
	);
};
