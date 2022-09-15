import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { CarCard } from "../components/mainPage/carCard";
import { Button } from "../components/ui-kit/button";
import { Select } from "../components/ui-kit/select";
import { useGetCarsQuery } from "../redux/apis/carApi";

const Home: NextPage = () => {
	const { data } = useGetCarsQuery();

	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<header className='h-header flex items-center justify-between px-24 '>
				logo
				<nav className='space-x-24 text-14'>
					<Link href='/'>Purchase</Link>
					<Link href='/'>My orders</Link>
					<Link href='/'>Sell</Link>
				</nav>
			</header>

			<main className='px-24 flex space-x-24 items-start'>
				<form className='p-24 border border-gray flex flex-col items-end'>
					<Select
						value={{ value: "a", displayValue: "a" }}
						options={[
							{ value: "a", displayValue: "a" },
							{ value: "b", displayValue: "b" },
						]}
						label='Color'
						className='mt-12'
					/>
					<Select
						value={{ value: "a", displayValue: "a" }}
						options={[
							{ value: "a", displayValue: "a" },
							{ value: "b", displayValue: "b" },
						]}
						label='Manufacturer'
						className='mt-12'
					/>
					<Button className='mt-24'>Filter</Button>
				</form>
				<div className='flex-1'>
					<h1 className='text-18 font-bold'>Available cars</h1>
					<h2 className='mt-8 text-18'>
						Showing 10 of {data?.totalCarsCount} results
					</h2>

					<div className='space-y-12 mt-24'>
						{data?.cars.map((car, i) => (
							<CarCard {...car} key={i} />
						))}
					</div>
					<Button>Save</Button>
					<Select
						value={{ value: "a", displayValue: "a" }}
						options={[
							{ value: "a", displayValue: "a" },
							{ value: "b", displayValue: "b" },
						]}
					/>
					<h1 className='bg-red-200'>
						Welcome to <a href='https://nextjs.org'>Next.js!</a>
					</h1>
					<p>
						Get started by editing <code>pages/index.tsx</code>
					</p>
				</div>
			</main>
			<footer className='flex items-center justify-center border-t border-gray h-header text-12'>
				© AUTO1 Group 2018
			</footer>
		</div>
	);
};

export default Home;
