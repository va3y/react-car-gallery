import { baseUrl } from "../../redux/utils/baseQuery";
import { mswServer } from "../../utils/msw";
import { rest } from "msw";
import { CarListPage } from "../CarListPage";
import { renderWithStore } from "../../utils/renderWithStore";
import { carStub } from "../../__stubs__/carStub";
import { fireEvent, screen } from "@testing-library/react";
import {
	SELECT_ALL_COLORS_OPTION,
	SELECT_ALL_MANUFACTURERS_OPTION,
} from "../../redux/reducers/carList";
import { GetCarsResponse } from "../../redux/utils/types";

describe("CarListPage", () => {
	const colorsStub = ["red", "white", "green"];
	const manufacturersStub = [{ name: "BMW" }, { name: "Audi" }];
	beforeEach(() => {
		mswServer.use(
			rest.get(`${baseUrl}colors`, (req, res, ctx) => {
				return res.once(ctx.status(200), ctx.json({ colors: colorsStub }));
			})
		);
		mswServer.use(
			rest.get(`${baseUrl}manufacturers`, (req, res, ctx) => {
				return res.once(
					ctx.status(200),
					ctx.json({ manufacturers: manufacturersStub })
				);
			})
		);
	});

	afterEach(jest.clearAllMocks);
	afterEach(mswServer.resetHandlers);

	it("Shows the loading text on first request", async () => {
		renderWithStore(<CarListPage />);

		screen.getByText("Loading the listing...");
	});

	it("Renders a fetched car name and stock number", async () => {
		mswServer.use(
			rest.get(`${baseUrl}cars`, (req, res, ctx) => {
				return res.once(ctx.status(200), ctx.json({ cars: [carStub] }));
			})
		);

		renderWithStore(<CarListPage />);

		await screen.findByText(carStub.modelName);
		await screen.findByText(carStub.stockNumber, { exact: false });
	});

	it("Requests a first page by default", async () => {
		mswServer.use(
			rest.get(`${baseUrl}cars`, (req, res, ctx) => {
				const page = req.url.searchParams.get("page");
				if (page === "1") {
					return res.once(ctx.status(200), ctx.json({ cars: [carStub] }));
				}
			})
		);

		renderWithStore(<CarListPage />);

		await screen.findByText(carStub.modelName);
	});

	it("No color or manufacturer is specified by default", async () => {
		mswServer.use(
			rest.get(`${baseUrl}cars`, (req, res, ctx) => {
				if (
					!req.url.searchParams.get("color") &&
					!req.url.searchParams.get("color")
				) {
					return res.once(ctx.status(200), ctx.json({ cars: [carStub] }));
				}
			})
		);

		renderWithStore(<CarListPage />);

		await screen.findByText(carStub.modelName);
	});

	it("User is able to select color and request cars with it", async () => {
		mswServer.use(
			rest.get(`${baseUrl}cars`, (req, res, ctx) => {
				if (req.url.searchParams.get("color") === "red") {
					return res.once(ctx.status(200), ctx.json({ cars: [carStub] }));
				}
			})
		);
		renderWithStore(<CarListPage />);

		fireEvent.click(screen.getByText(SELECT_ALL_COLORS_OPTION.displayValue));
		fireEvent.click(await screen.findByText("Red"));
		fireEvent.click(screen.getByText("Filter"));

		await screen.findByText(carStub.modelName);
	});

	it("User is able to select manufacturers and request cars with it", async () => {
		mswServer.use(
			rest.get(`${baseUrl}cars`, (req, res, ctx) => {
				if (req.url.searchParams.get("manufacturer") === "Audi") {
					return res.once(ctx.status(200), ctx.json({ cars: [carStub] }));
				}
			})
		);
		renderWithStore(<CarListPage />);

		fireEvent.click(
			screen.getByText(SELECT_ALL_MANUFACTURERS_OPTION.displayValue)
		);
		fireEvent.click(await screen.findByText("Audi"));
		fireEvent.click(screen.getByText("Filter"));

		await screen.findByText(carStub.modelName);
	});

	it("User can go the next page of pagination", async () => {
		const secondPageCar = {
			modelName: "model x tasla special",
			stockNumber: 222,
			mileage: { number: 1 },
		};
		mswServer.use(
			rest.get(`${baseUrl}cars`, (req, res, ctx) => {
				if (req.url.searchParams.get("page") === "2") {
					return res(ctx.json({ cars: [secondPageCar] }));
				}
				return res(
					ctx.status(200),
					ctx.json({
						cars: [carStub],
						totalPageCount: 20,
						totalCarsCount: 20,
					} as GetCarsResponse)
				);
			})
		);

		renderWithStore(<CarListPage />);
		await screen.findByText(carStub.modelName);
		fireEvent.click(screen.getByText("Next"));

		await screen.findByText(secondPageCar.modelName);
	});

	it("User can go the last page of pagination", async () => {
		const secondPageCar = {
			modelName: "model x tasla special",
			stockNumber: 222,
			mileage: { number: 1 },
		};
		mswServer.use(
			rest.get(`${baseUrl}cars`, (req, res, ctx) => {
				if (req.url.searchParams.get("page") === "20") {
					return res(ctx.json({ cars: [secondPageCar] }));
				}
				return res(
					ctx.status(200),
					ctx.json({
						cars: [carStub],
						totalPageCount: 20,
						totalCarsCount: 20,
					} as GetCarsResponse)
				);
			})
		);

		renderWithStore(<CarListPage />);
		await screen.findByText(carStub.modelName);
		fireEvent.click(screen.getByText("Last"));

		await screen.findByText(secondPageCar.modelName);
	});
});
