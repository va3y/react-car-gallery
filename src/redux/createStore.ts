import { configureStore } from "@reduxjs/toolkit";
import { carApi } from "./apis/carApi";
import { carListReducer } from "./reducers/carList";

export const store = configureStore({
  reducer: { carList: carListReducer, [carApi.reducerPath]: carApi.reducer, },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(carApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
