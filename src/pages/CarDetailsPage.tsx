import { RouteComponentProps } from "wouter";
import { Button } from "../components/ui-kit/Button";
import { useSavedCars } from "../hooks/useSavedCars";
import { useGetCarDetailsQuery } from "../redux/apis/carApi";

export const CarDetailsPage: React.FC<
	RouteComponentProps<{ carId: string }>
> = ({ params: { carId } }) => {
	const { data, error } = useGetCarDetailsQuery(carId);

	const { getIsCarSaved, toggleSaveCarState } = useSavedCars();
	const isCurrentCarSaved = getIsCarSaved(carId);
	const onSaveCarClick = () => toggleSaveCarState(carId);

	return (
		<div className='w-full max-w-page-wrapper mx-auto flex flex-col md:flex-row md:space-x-24 px-12 mt-24'>
			{error && <div>Failed to fetch the car =( Try again later</div>}
			{!error && (
				<>
					<div className='max-w-prose'>
						<h1 className='text-32 mb-12 font-black'>
							{data?.car.manufacturerName}
						</h1>
						<div className='text-18 mb-12'>
							Stock # {data?.car.stockNumber} - {data?.car.color}
						</div>
						<p>
							This car is currently available and can be delivered as soon as
							tomorrow morning. Please be aware that delivery times shown in
							this page are not definitive and may change due to bad weather
							conditions
						</p>
					</div>
					<div className='border border-gray p-24'>
						<p>
							If you like this car, click the button and save it in your
							collection of favourite items.
						</p>
						<Button className='ml-auto mt-12' onClick={onSaveCarClick}>
							{isCurrentCarSaved ? "Remove from saved" : "Save"}
						</Button>
					</div>
				</>
			)}
		</div>
	);
};
