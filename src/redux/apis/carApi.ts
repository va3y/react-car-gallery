import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/baseQuery";
import { GetCarsResponse } from "../utils/types";

export const carApi = createApi({
	reducerPath: "carApi",
	baseQuery: baseQuery,
	endpoints: (builder) => ({
		getCars: builder.query<GetCarsResponse, void>({
			query: () => "cars",
		}),
	}),
});

export const { useGetCarsQuery } = carApi;
