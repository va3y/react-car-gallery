import { RouteComponentProps } from "wouter";
import { DefaultLayout } from "../components/layout";
import { Button } from "../components/ui-kit/button";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useGetCarDetailsQuery } from "../redux/apis/carApi";

export const CarDetailsPage: React.FC<
	RouteComponentProps<{ carId: string }>
> = ({ params: { carId } }) => {
	const { data } = useGetCarDetailsQuery(carId);
	const [savedCard, setSavedCard] = useLocalStorage<Record<string, boolean>>(
		`saved-cars`,
		{}
	);
	const isCurrentCarSaved = Boolean(savedCard[carId]);
	const onSaveCarClick = () => {
		setSavedCard({ ...savedCard, [carId]: !isCurrentCarSaved });
	};

	return (
		<DefaultLayout>
			<div className='w-full max-w-page-wrapper mx-auto flex space-x-24'>
				<div className=''>
					<h1 className='text-32 mb-12 font-black'>
						{data?.car.manufacturerName}
					</h1>
					<div className='text-18 mb-12'>
						Stock # {data?.car.stockNumber} - {data?.car.color}
					</div>
					<p>
						This car is currently available and can be delivered as soon as
						tomorrow morning. Please be aware that delivery times shown in this
						page are not definitive and may change due to bad weather conditions
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
			</div>
		</DefaultLayout>
	);
};
