import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistMiddleware } from "./persist-middleware";
import { authActions, authReducer } from "@/pages/login-page";
import { injectTokens } from "@/shared/api";

// Предзагрузка в стор токенов из localStorage
function loadState() {
	try {
		const serializedState = localStorage.getItem("auth");
		if (serializedState === null) return undefined;
		return { auth: JSON.parse(serializedState) };
	} catch (err) {
		if (err instanceof Error) console.log(err.message);
		return undefined;
	}
}

export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat([persistMiddleware]);
	},
	preloadedState: loadState(),
});

setupListeners(store.dispatch);

injectTokens({
	getAccessToken: () => store.getState().auth.accessToken ?? null,
	getRefreshToken: () => store.getState().auth.refreshToken ?? null,
	setAccessToken: (token: string) =>
		store.dispatch(authActions.setAccessToken(token)),
});

declare global {
	type RootState = ReturnType<typeof store.getState>;
	type AppDispatch = typeof store.dispatch;
}
