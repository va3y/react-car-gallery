import Head from "next/head";
import Link from "next/link";
import { PropsWithChildren } from "react";

export const DefaultLayout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='relative flex flex-col min-h-screen'>
			<Head>
				<title>Auto page</title>
				<meta name='description' content='A page about the autos!' />
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
			<main>{children}</main>
			<footer className='flex items-center h-header justify-center border-t border-gray text-12 mt-auto'>
				© AUTO1 Group 2018
			</footer>
		</div>
	);
};
