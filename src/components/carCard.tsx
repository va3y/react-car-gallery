import React from "react";
import cn from "classnames";
import { Car } from "../redux/utils/types";
import { Link, useLocation } from "wouter";

const loadingClassStr =
	"relative after:absolute after:block after:left-0 after:top-0 after:bg-gray after:w-full after:h-full after:rounded-md after:opacity-0 transition delay-400";
const loadingActiveClassStr =
	"after:opacity-100 text-transparent after:transition after:duration-300 after:delay-500";

export const CarCard: React.FC<Car & { isFetching: boolean }> = (props) => {
	const cardPageUrl = `/car/${props.stockNumber}`;
	const [, setLocation] = useLocation();
	const onCardClick = () => {
		setLocation(cardPageUrl);
	};

	return (
		<div
			onClick={onCardClick}
			className={cn(
				"flex p-12 space-x-24 border border-gray group cursor-pointer",
				props.isFetching && "pointer-events-none"
			)}>
			<div
				className={cn(
					"h-image w-image flex",
					loadingClassStr,
					props.isFetching && loadingActiveClassStr
				)}>
				<img
					width='120'
					height='70'
					src={props.pictureUrl}
					className='object-contain'
					alt='An image of a car'
				/>
			</div>

			<div className='flex flex-col items-start space-y-8 text-12'>
				<div
					className={cn(
						"font-black text-18 w-full",
						loadingClassStr,
						props.isFetching && loadingActiveClassStr
					)}>
					{props.modelName}
				</div>
				<div
					className={cn(
						"capitalize",
						loadingClassStr,
						props.isFetching && loadingActiveClassStr
					)}>
					Stock # {props.stockNumber} - {props.mileage.number.toLocaleString()}
					<span className='uppercase'> {props.mileage.unit}</span> -{" "}
					{props.fuelType} - {props.color}
				</div>
				<Link
					className={cn(
						"group-hover:underline mt-12 text-primary block",
						loadingClassStr,
						props.isFetching && loadingActiveClassStr
					)}
					href={cardPageUrl}>
					View details
				</Link>
			</div>
		</div>
	);
};
