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

	return (
		<div className='relative flex flex-col min-h-screen'>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<header className='h-header flex items-center justify-between px-24 '>
				<div>logo</div>
				<nav className='space-x-24 text-14'>
					<Link href='/'>Purchase</Link>
					<Link href='/'>My orders</Link>
					<Link href='/'>Sell</Link>
				</nav>
			</header>

			<main className='px-24 flex items-start flex-col md:flex-row md:space-x-24'>
				<Filters />
				<div className='flex-1 w-full pb-24'>
					<h1 className='text-18 font-bold'>Available cars</h1>
					<h2 className='mt-8 text-18'>
						Showing 10 of {data?.totalCarsCount} results
					</h2>

					<div className='space-y-12 my-24'>
						{data?.cars.map((car, i) => (
							<CarCard isFetching={isFetching} {...car} key={i} />
						))}
					</div>
					<Pagination
						currentPage={carList.page}
						pagesTotal={data?.totalPageCount}
						onChangePage={onChangePage}
					/>
				</div>
			</main>
			<footer className='flex items-center h-header justify-center border-t border-gray text-12 mt-auto'>
				© AUTO1 Group 2018
			</footer>
		</div>
	);
};

export default Home;
