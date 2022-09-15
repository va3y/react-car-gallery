import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const baseQuery = fetchBaseQuery({
	baseUrl: "https://auto1-mock-server.herokuapp.com/api/",
});
