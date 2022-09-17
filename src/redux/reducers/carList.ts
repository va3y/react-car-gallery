import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SELECT_ALL_COLORS_OPTION, SELECT_ALL_MANUFACTURERS_OPTION } from "../../components/mainPage/filters";
import { IGetCarsRequestParams } from "../utils/types";

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
