import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { carApi } from "./apis/carApi";

export const store = configureStore({
	reducer: combineReducers({ [carApi.reducerPath]: carApi.reducer }),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(carApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
