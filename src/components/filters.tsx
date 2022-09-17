import { FormEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	useGetColorsQuery,
	useGetManufacturersQuery,
} from "../redux/apis/carApi";
import { RootState } from "../redux/createStore";
import {
	carListActions,
	SELECT_ALL_COLORS_OPTION,
	SELECT_ALL_MANUFACTURERS_OPTION,
} from "../redux/reducers/carList";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetters";
import { Button } from "./ui-kit/button";
import { Select } from "./ui-kit/select";

export const Filters = () => {
	const { data: colors } = useGetColorsQuery(undefined, {
		selectFromResult: ({ data, ...rest }) => ({
			// Perhaps better to use a memoized selector in a production app,
			// But here, this would fall under the "premature optizimation" I guess
			data: [
				SELECT_ALL_COLORS_OPTION,
				...(data?.colors.map((color) => ({
					displayValue: capitalizeFirstLetter(color),
					value: color,
				})) || []),
			],
			...rest,
		}),
	});
	const { data: manufacturers } = useGetManufacturersQuery(undefined, {
		selectFromResult: ({ data, ...rest }) => ({
			data: [
				SELECT_ALL_MANUFACTURERS_OPTION,
				...(data?.manufacturers.map((manufacturer) => ({
					value: manufacturer.name,
					displayValue: manufacturer.name,
				})) || []),
			],
			...rest,
		}),
	});

	const dispatch = useDispatch();
	const { color: initialColor, manufacturer: initialManufacturer } =
		useSelector((state: RootState) => state.carList);
	const [color, setColor] = useState(initialColor);
	const [manufacturer, setManufacturer] = useState(initialManufacturer);

	const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		dispatch(
			carListActions.setFilters({
				color,
				manufacturer,
			})
		);
	};

	return (
		<form
			className='p-24 border border-gray flex flex-col items-end'
			onSubmit={onSubmit}>
			<Select
				name='color'
				value={color}
				options={colors}
				label='Color'
				className='mt-12'
				onChange={setColor}
			/>
			<Select
				value={manufacturer}
				options={manufacturers}
				label='Manufacturer'
				className='mt-12'
				onChange={setManufacturer}
			/>
			<Button className='mt-24'>Filter</Button>
		</form>
	);
};
