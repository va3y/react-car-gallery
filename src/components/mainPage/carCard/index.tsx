import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Car } from "../../../redux/utils/types";

export const CarCard: React.FC<Car> = (props) => {
	return (
		<div className='flex p-12 space-x-24 border border-gray'>
			<Image width={120} height={40} src={props.pictureUrl} alt='Car image' />
			<div className='flex flex-col space-y-8 text-12'>
				<div className='font-black text-18'>{props.modelName}</div>
				<div className='capitalize'>
					Stock # {props.stockNumber} - {props.mileage.number.toLocaleString()}
					<span className='uppercase'> {props.mileage.unit}</span> -{" "}
					{props.fuelType} - {props.color}
				</div>
				<Link href={`/car/${props.stockNumber}`}>View details</Link>
			</div>
		</div>
	);
};
