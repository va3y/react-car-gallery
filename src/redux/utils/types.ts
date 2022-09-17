export interface IGetCarsRequestParams {
  manufacturer?: string;
  color?: string;
  sort?: 'asc' | 'desc';
  page?: number
}

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


export interface GetManufacturersResponse {
  manufacturers: Manufacturer[];
}

export interface Manufacturer {
  name: string;
  models: Model[];
}

export interface Model {
  name: string;
}

export interface GetColorsResponse {
  colors: string[]
}

export interface GetCarDetailsResponse {
  car: Car;
}
