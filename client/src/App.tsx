import React from "react";
import "./App.css";
import MainRoutes from "../src/Router/Routes";
import { Provider } from "react-redux";
import { store } from "./Store/store";

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<MainRoutes />
		</Provider>
	);
};

export default App;
