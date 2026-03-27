import { authActions, authReducer, initialAuthState } from "@/pages/login-page";
import { injectTokens } from "@/shared/api";
import { configureStore } from "@reduxjs/toolkit";
import { persistMiddleware } from "./persist-middleware";
import { chatReducer } from "@/entities/chat";

// Предзагрузка в стор токенов из localStorage
function loadState() {
	try {
		const serializedState = localStorage.getItem("auth");
		if (serializedState === null) return undefined;
		return { auth: { ...initialAuthState, ...JSON.parse(serializedState) } };
	} catch (err) {
		if (err instanceof Error) console.log(err.message);
		return undefined;
	}
}

export const store = configureStore({
	reducer: {
		auth: authReducer,
		chat: chatReducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat([persistMiddleware]);
	},
	preloadedState: loadState(),
});

export const inject = ({
	reduxStore,
	router,
}: {
	reduxStore: typeof store;
	router: { navigate: (path: string) => void };
}) => {
	injectTokens({
		getAccessToken: () => reduxStore.getState().auth.accessToken ?? null,
		getRefreshToken: () => reduxStore.getState().auth.refreshToken ?? null,
		setAccessToken: (token: string) =>
			reduxStore.dispatch(authActions.setAccessToken(token)),
		resetTokens: () => {
			reduxStore.dispatch(authActions.removeTokens());
			router.navigate("/login");
		},
	});
};

declare global {
	type RootState = ReturnType<typeof store.getState>;
	type AppDispatch = typeof store.dispatch;
}
