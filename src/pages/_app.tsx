import "../styles/globals.css";
import type { AppProps } from "next/app";
import { nextReduxWrapper } from "../redux/createStore";
import { Provider } from "react-redux";

function MyApp({ Component, ...rest }: AppProps) {
	const { store, props } = nextReduxWrapper.useWrappedStore(rest);
	return (
		<Provider store={store}>
			<Component {...props.pageProps} />
		</Provider>
	);
}

export default MyApp;
