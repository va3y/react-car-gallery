import { PropsWithChildren } from "react";
import { Link } from "wouter";

export const DefaultLayout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='relative flex flex-col min-h-screen'>
			<header className='h-header flex items-center justify-between px-24 '>
				<div>logo</div>
				<nav className='space-x-24 text-14'>
					<Link to='/'>Purchase</Link>
					<Link to='/'>My orders</Link>
					<Link to='/'>Sell</Link>
				</nav>
			</header>
			<main>{children}</main>
			<footer className='flex items-center h-header justify-center border-t border-gray text-12 mt-auto'>
				© AUTO1 Group 2018
			</footer>
		</div>
	);
};
