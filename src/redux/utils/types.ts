export interface GetCarsResponse {
	cars: Car[];
	totalPageCount: number;
	totalCarsCount: number;
}

export interface Car {
	stockNumber: number;
	manufacturerName: string;
	modelName: string;
	color: string;
	mileage: Mileage;
	fuelType: string;
	pictureUrl: string;
}

export interface Mileage {
	number: number;
	unit: string;
}
