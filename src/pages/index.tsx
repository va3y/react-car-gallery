import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { CarCard } from "../components/mainPage/carCard";
import { Filters } from "../components/mainPage/filters";
import { carApi, useGetCarsQuery } from "../redux/apis/carApi";
import { GetStaticProps } from "next";
import { nextReduxWrapper, RootState } from "../redux/createStore";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../components/mainPage/pagination";
import { carListActions } from "../redux/reducers/carList";
import { DefaultLayout } from "../components/layout";

nextReduxWrapper.getStaticProps;

export const getStaticProps: GetStaticProps = nextReduxWrapper.getStaticProps(
	(store) => async () => {
		const state = store.getState();
		store.dispatch(carApi.endpoints.getCars.initiate(state.carList));
		store.dispatch(carApi.endpoints.getColors.initiate());
		store.dispatch(carApi.endpoints.getManufacturers.initiate());

		await Promise.all(carApi.util.getRunningOperationPromises());
		return {
			props: {},
		};
	}
);

const Home: NextPage = () => {
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

export default Home;
