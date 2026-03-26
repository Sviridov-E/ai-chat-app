import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import { PersonalPage } from "../pages/personal-page";
import { ChatPage } from "../pages/chat-page/ui/chat-page";
import { ParserPage } from "../pages/parser-page";
import { LoginPage } from "../pages/login-page";
import { Provider } from "react-redux";
import { store } from "./model";
import { Toaster } from "react-hot-toast";

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
	return (
		<Provider store={store}>
			<RouterProvider router={router} />

			<Toaster position="bottom-center" />
		</Provider>
	);
}

export default App;
