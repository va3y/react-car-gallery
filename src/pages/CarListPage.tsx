import { CarCard } from "../components/carCard";
import { Filters } from "../components/filters";
import { useGetCarsQuery } from "../redux/apis/carApi";
import { RootState } from "../redux/createStore";
import { Pagination } from "../components/pagination";
import { carListActions } from "../redux/reducers/carList";
import { DefaultLayout } from "../components/layout";
import { useDispatch, useSelector } from "react-redux";

export const CarListPage = () => {
	const dispatch = useDispatch();
	const carList = useSelector((state: RootState) => state.carList);

	const { data, isFetching } = useGetCarsQuery(carList);
	const onChangePage = (newPage: number) =>
		dispatch(carListActions.setPage(newPage));
	const showingCarsCount = Math.min(10, data?.totalCarsCount || 10);

	return (
		<DefaultLayout>
			<div className='px-24 flex items-start flex-col md:flex-row md:space-x-24'>
				<Filters />
				<div className='flex-1 w-full pb-24'>
					<h1 className='text-18 font-bold'>Available cars</h1>
					<h2 className='mt-8 text-18'>
						Showing {showingCarsCount} of {data?.totalCarsCount} results
					</h2>
					<div className='space-y-12 my-24'>
						{data?.cars.map((car) => (
							<CarCard isFetching={isFetching} {...car} key={car.stockNumber} />
						))}
					</div>
					<Pagination
						currentPage={carList.page}
						pagesTotal={data?.totalPageCount}
						onChangePage={onChangePage}
					/>
				</div>
			</div>
		</DefaultLayout>
	);
};
