import { useLocalStorage } from "./useLocalStorage";

export const useSavedCars = () => {
	const [savedCars, setSavedCars] = useLocalStorage<Record<string, boolean>>(
		"saved-cars",
		{}
	);

	return {
		toggleSaveCarState: (carId: string) =>
			setSavedCars({ ...savedCars, [carId]: !savedCars[carId] }),
		getIsCarSaved: (carId: string) => Boolean(savedCars[carId]),
	};
};
