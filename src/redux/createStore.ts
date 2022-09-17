import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { carApi } from "./apis/carApi";
import { carListReducer } from "./reducers/carList";

const store = configureStore({
  reducer: { carList: carListReducer, [carApi.reducerPath]: carApi.reducer, },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(carApi.middleware),
});

export const makeStore = () => store

export const nextReduxWrapper = createWrapper(makeStore, {
  debug: false
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
