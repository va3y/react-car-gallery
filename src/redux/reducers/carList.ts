import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGetCarsRequestParams } from "../utils/types";

export const SELECT_ALL_COLORS_OPTION = {
	displayValue: "All colors",
	value: "",
};

export const SELECT_ALL_MANUFACTURERS_OPTION = {
	displayValue: "All manufacturers",
	value: "",
};

export interface CarListState extends IGetCarsRequestParams {
}

const initialState: CarListState = {
  color: SELECT_ALL_COLORS_OPTION.value,
  manufacturer: SELECT_ALL_MANUFACTURERS_OPTION.value,
  page: 1
};

const carListSlice = createSlice({
  name: "carList",
  initialState,
  reducers: {
    setPage(state, { payload }: PayloadAction<number>) {
      state.page = payload;
    },
    setFilters(state, { payload }: PayloadAction<{
      color?: string,
      manufacturer?: string
    }>) {
      state.page = 1;
      state.color = payload.color;
      state.manufacturer = payload.manufacturer;
    },
  }
});

export const { actions: carListActions, reducer: carListReducer } = carListSlice
