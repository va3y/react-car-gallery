import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { configureStoreParam, RootState, Store } from "../redux/createStore";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
	preloadedState?: PreloadedState<RootState>;
	store?: Store;
}
export const renderWithStore = (
	ui: React.ReactElement,
	{
		preloadedState = {} as RootState,
		store = configureStore({
			...configureStoreParam,
			preloadedState,
		}),
		...renderOptions
	}: ExtendedRenderOptions = {}
) => {
	function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
		return <Provider store={store}>{children}</Provider>;
	}

	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
