import { createBrowserRouter, redirect } from "react-router";
import { PersonalPage } from "../pages/personal-page";
import { ChatPage } from "../pages/chat-page/ui/chat-page";
import { ParserPage } from "../pages/parser-page";
import { LoginPage } from "../pages/login-page";
import { store } from "./model";

const redirectToLoginLoader = () => {
	const access = store.getState().auth.accessToken;
	if (!access) return redirect("/login");
};

export const router = createBrowserRouter([
	{
		path: "/",
		Component: PersonalPage,
		loader: redirectToLoginLoader,
	},
	{
		path: "/login",
		loader: () => {
			const access = store.getState().auth.accessToken;
			if (access) return redirect("/");
		},
		Component: LoginPage,
	},
	{ path: "/chat", loader: redirectToLoginLoader, Component: ChatPage },
	{ path: "/parser", loader: redirectToLoginLoader, Component: ParserPage },
	{
		path: "*",
		loader: () => {
			return redirect("/");
		},
	},
]);
