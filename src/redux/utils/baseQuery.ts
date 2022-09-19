import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const baseUrl = "https://auto1-mock-server.herokuapp.com/api/";

export const baseQuery = fetchBaseQuery({ baseUrl });
