import { CarCard } from "../components/СarCard";
import { Filters } from "../components/Filters";
import { useGetCarsQuery } from "../redux/apis/carApi";
import { RootState } from "../redux/createStore";
import { Pagination } from "../components/Pagination";
import { carListActions } from "../redux/reducers/carList";
import { useDispatch, useSelector } from "react-redux";
import { useSavedCars } from "../hooks/useSavedCars";

export const CarListPage = () => {
	const dispatch = useDispatch();
	const carList = useSelector((state: RootState) => state.carList);
	const onChangePage = (newPage: number) => {
		dispatch(carListActions.setPage(newPage));
	};

	const { data, isFetching, error, isLoading } = useGetCarsQuery(carList);
	const { getIsCarSaved } = useSavedCars();

	const showingCarsCount = Math.min(10, data?.totalCarsCount || 10);

	return (
		<div className='px-24 flex items-start flex-col md:flex-row md:space-x-24'>
			<Filters />
			<div className='flex-1 w-full pb-24'>
				<h1 className='text-18 font-bold'>Available cars</h1>
				<h2 className='mt-8 text-18'>
					Showing {showingCarsCount} of {data?.totalCarsCount} results
				</h2>
				<div className='space-y-12 my-24'>
					{error && "Uh oh, something went wrong..."}
					{isLoading && (
						<div className='mx-auto text-32 animate-pulse'>
							Loading the listing...
						</div>
					)}
					{data?.cars.map((car) => (
						<CarCard
							isSaved={getIsCarSaved(car.stockNumber.toString())}
							isFetching={isFetching}
							{...car}
							key={car.stockNumber}
						/>
					))}
				</div>
				<Pagination
					currentPage={carList.page}
					pagesTotal={data?.totalPageCount}
					onChangePage={onChangePage}
				/>
			</div>
		</div>
	);
};
