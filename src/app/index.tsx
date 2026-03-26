import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import { PersonalPage } from "../pages/personal-page";
import { ChatPage } from "../pages/chat-page/ui/chat-page";
import { ParserPage } from "../pages/parser-page";
import { LoginPage } from "../pages/login-page";

const router = createBrowserRouter([
	{
		path: "/",
		Component: PersonalPage,
	},
	{ path: "/login", Component: LoginPage },
	{ path: "/chat", Component: ChatPage },
	{ path: "/parser", Component: ParserPage },
	{
		path: "*",
		loader: () => {
			return redirect("/");
		},
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
