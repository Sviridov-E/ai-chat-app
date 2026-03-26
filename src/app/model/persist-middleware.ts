import {
	isAction,
	type Middleware,
	type UnknownAction,
} from "@reduxjs/toolkit";

// Сохраняем в localStorage при auth actions
export const persistMiddleware: Middleware<UnknownAction, { auth?: object }> =
	(store) => (next) => (action) => {
		const result = next(action);

		if (isAction(action) && action.type.startsWith("auth/")) {
			const state = store.getState();
			localStorage.setItem("auth", JSON.stringify(state.auth));
		}

		return result;
	};
