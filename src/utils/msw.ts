import { rest } from "msw";
import { setupServer } from "msw/node";
import { baseUrl } from "../redux/utils/baseQuery";

const baseHandlers = [
	rest.get(`${baseUrl}cars/*`, (req, res) => res()),
	rest.get(`${baseUrl}manufacturers`, (req, res) => res()),
	rest.get(`${baseUrl}colors`, (req, res) => res()),
	rest.get(`${baseUrl}cars`, (req, res) => res()),
];

export const mswServer = setupServer(...baseHandlers);
