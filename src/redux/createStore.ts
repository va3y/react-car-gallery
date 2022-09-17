import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { carApi } from "./apis/carApi";
import { carListReducer } from "./reducers/carList";

export const configureStoreParam: ConfigureStoreOptions = {
	reducer: { carList: carListReducer, [carApi.reducerPath]: carApi.reducer },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(carApi.middleware),
};

export const store = configureStore(configureStoreParam);

export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
