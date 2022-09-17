import { Link } from "wouter";

export const NotFoundPage: React.FC = () => {
	return (
		<div className='my-auto text-center h-full flex items-center flex-col justify-center'>
			<h1 className='text-32'>404 - Not found</h1>
			<p className='text-18'>
				Sorry, the page you are looking for does not exist.
			</p>
			<p className='text-18'>
				You can always go back to the{" "}
				<Link className='text-primary' href='/'>
					homepage
				</Link>
				.
			</p>
		</div>
	);
};
