import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { baseQuery } from "../utils/baseQuery";
import { GetCarDetailsResponse, GetCarsResponse, GetColorsResponse, GetManufacturersResponse, IGetCarsRequestParams } from "../utils/types";



export const carApi = createApi({
  reducerPath: "carApi",
  baseQuery,
  endpoints: (builder) => ({
    getCars: builder.query<GetCarsResponse, IGetCarsRequestParams>({
      query: (params) => ({ url: "cars", params }),
    }),
    getColors: builder.query<GetColorsResponse, void>({
      query: () => "colors",
    }),
    getManufacturers: builder.query<GetManufacturersResponse, void>({
      query: () => "manufacturers",
    }),
    getCarDetails: builder.query<GetCarDetailsResponse, number>({
      query: (stockNumber) => `manufacturers/${stockNumber}`,
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
});

export const { useGetCarsQuery, useGetCarDetailsQuery, useGetColorsQuery, useGetManufacturersQuery, } = carApi;

