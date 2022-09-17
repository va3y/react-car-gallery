import Image from "next/image";
import Link from "next/link";
import React from "react";
import cn from "classnames";
import { Car } from "../../../redux/utils/types";
import { useRouter } from "next/router";

export const CarCard: React.FC<Car & { isFetching: boolean }> = (props) => {
	const router = useRouter();
	const cardPageUrl = `/car/${props.stockNumber}`;
	const onCardClick = () => router.push(cardPageUrl);

	return (
		<div
			onClick={onCardClick}
			className={cn(
				"flex p-12 space-x-24 border border-gray group cursor-pointer",
				props.isFetching && "bg-gray"
			)}>
			<Image
				objectFit='contain'
				width={120}
				height={70}
				src={props.pictureUrl}
				alt='Car image'
			/>
			<div className='flex flex-col space-y-8 text-12'>
				<div className='font-black text-18'>{props.modelName}</div>
				<div className='capitalize'>
					Stock # {props.stockNumber} - {props.mileage.number.toLocaleString()}
					<span className='uppercase'> {props.mileage.unit}</span> -{" "}
					{props.fuelType} - {props.color}
				</div>
				<Link href={cardPageUrl} passHref>
					<a className='group-hover:underline mt-12 text-primary' href=''>
						View details
					</a>
				</Link>
			</div>
		</div>
	);
};
