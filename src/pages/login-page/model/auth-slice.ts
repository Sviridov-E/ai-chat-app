import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "./login-user-thunk";

interface AuthState {
	accessToken?: string | null;
	refreshToken?: string | null;
	error?: string | null;
	isLoading?: boolean;
}

const initialState: AuthState = {
	accessToken: null,
	refreshToken: null,
	error: null,
	isLoading: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAccessToken: (state, action: PayloadAction<string>) => {
			state.accessToken = action.payload;
		},
		removeTokens: (state) => {
			state.accessToken = null;
			state.refreshToken = null;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginUser.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});

		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.accessToken = action.payload.access;
			state.refreshToken = action.payload.refresh;
		});

		builder.addCase(loginUser.rejected, (state, action) => {
			const error =
				typeof action.payload === "string" ? action.payload : "Ошибка входа";
			state.isLoading = false;
			state.error = error;
		});
	},
});

export const authActions = { ...authSlice.actions, loginUser };

export const authReducer = authSlice.reducer;
