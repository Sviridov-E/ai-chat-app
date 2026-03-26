import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { inject, store } from "./model";
import { router } from "./router";

inject({ reduxStore: store, router });

function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />

			<Toaster position="bottom-center" />
		</Provider>
	);
}

export default App;
