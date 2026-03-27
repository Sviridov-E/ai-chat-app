export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const PATHS = {
	LOGIN: "/api/auth/login",
	LOGOUT: "/api/auth/logout",
	REFRESH: "/api/auth/refresh",

	CHAT_CODE: "/api/streaming/get-code-response",
	CHAT_TABLE: "/api/streaming/get-table-response",
};
