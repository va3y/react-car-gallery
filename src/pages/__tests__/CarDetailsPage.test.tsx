import { CarDetailsPage } from "../CarDetailsPage";
import React from "react";
import { renderWithStore } from "../../utils/renderWithStore";
import { mswServer } from "../../utils/msw";
import { baseUrl } from "../../redux/utils/baseQuery";
import { rest } from "msw";
import { carStub } from "../../__stubs__/carStub";
import { fireEvent, screen } from "@testing-library/react";

describe("CarDetailsPage", () => {
	const carId = "123";

	afterEach(jest.clearAllMocks);

	it("Renders details about the car that were fetched", async () => {
		mswServer.use(
			rest.get(`${baseUrl}cars/${carId}`, (req, res, ctx) => {
				return res.once(ctx.status(200), ctx.json({ car: carStub }));
			})
		);
		renderWithStore(<CarDetailsPage params={{ carId }} />);

		await screen.findByText(carStub.stockNumber, { exact: false });
		screen.getByText(carStub.manufacturerName, { exact: false });
	});

	it("Displays an error text if the server gave an error", async () => {
		mswServer.use(
			rest.get(`${baseUrl}cars/${carId}`, (req, res, ctx) => {
				return res.once(ctx.status(500));
			})
		);
		renderWithStore(<CarDetailsPage params={{ carId }} />);

		await screen.findByText("Failed to fetch the car", { exact: false });
	});

	describe("Saving car to local storage", () => {
		it("When car is saved to ls, card show corresponding text", async () => {
			const getItem = () => JSON.stringify({ [carId]: true });
			const setItem = jest.fn();
			Object.defineProperty(window, "localStorage", {
				value: { getItem, setItem },
				writable: true,
			});
			mswServer.use(
				rest.get(`${baseUrl}cars/${carId}`, (req, res, ctx) => {
					return res.once(ctx.status(200), ctx.json({ car: carStub }));
				})
			);

			renderWithStore(<CarDetailsPage params={{ carId }} />);

			screen.getByText("Remove from saved");
		});

		it("When car is saved to ls, user can remove it by clicking the button", async () => {
			const getItem = () => JSON.stringify({ [carId]: true });
			const setItem = jest.fn();
			Object.defineProperty(window, "localStorage", {
				value: { getItem, setItem },
				writable: true,
			});
			mswServer.use(
				rest.get(`${baseUrl}cars/${carId}`, (req, res, ctx) => {
					return res.once(ctx.status(200), ctx.json({ car: carStub }));
				})
			);

			renderWithStore(<CarDetailsPage params={{ carId }} />);
			fireEvent.click(screen.getByText("Remove from saved"));

			expect(setItem).toBeCalledWith(
				"saved-cars",
				JSON.stringify({ [carId]: false })
			);
		});

		it("On save button click, saves the car to ls", async () => {
			const setItem = jest.fn();
			const getItem = jest.fn();
			Object.defineProperty(window, "localStorage", {
				value: { setItem, getItem },
				writable: true,
			});
			mswServer.use(
				rest.get(`${baseUrl}cars/${carId}`, (req, res, ctx) => {
					return res.once(ctx.status(200), ctx.json({ car: carStub }));
				})
			);

			renderWithStore(<CarDetailsPage params={{ carId }} />);
			fireEvent.click(screen.getByText("Save"));

			expect(setItem).toBeCalledWith(
				"saved-cars",
				JSON.stringify({ [carId]: true })
			);
		});
	});
});
