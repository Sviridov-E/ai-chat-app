declare global {
	interface Window {
		ENV_BACKEND_URL?: string;
	}
}

const isDevMode = import.meta.env.DEV;

export const API_URL =
	(!isDevMode && window.ENV_BACKEND_URL) ||
	(import.meta.env.VITE_API_URL as string) ||
	"http://localhost:8000";

export const PATHS = {
	LOGIN: "/api/auth/login",
	LOGOUT: "/api/auth/logout",
	REFRESH: "/api/auth/refresh",

	CHAT_CODE: "/api/streaming/get-code-response",
	CHAT_TABLE: "/api/streaming/get-table-response",
};
