import { createBrowserRouter, redirect } from "react-router";
import { PersonalPage } from "../pages/personal-page";
import { ChatPage } from "../pages/chat-page/ui/chat-page";
import { LoginPage } from "../pages/login-page";
import { store } from "./model";
import { MainLayout } from "./ui/main-layout";

const redirectToLoginLoader = () => {
	const access = store.getState().auth.accessToken;
	if (!access) return redirect("/login");
};

export const router = createBrowserRouter([
	{
		Component: MainLayout,
		loader: redirectToLoginLoader,
		children: [
			{
				path: "/",
				Component: PersonalPage,
			},
			{ path: "/chat", Component: ChatPage },
		],
	},

	{
		path: "/login",
		loader: () => {
			const access = store.getState().auth.accessToken;
			if (access) return redirect("/");
		},
		Component: LoginPage,
	},

	{
		path: "*",
		loader: () => {
			return redirect("/");
		},
	},
]);
