export interface rootState {
  car: Icar;
}
export interface Icar {
  _id: string;
  name: string;
  capacity: number;
  fuelType: number;
  yearCreated: number;
  autoMarket: string;
  price: number;
  numbereatSeats: number;
  origin: string;
  image: string;
  status: number;
  colorOutSide: string;
  colorInSide: string;
  consumeFuel: string;
  doorNumber: number;
  popular: true;
  gear: number;
  note: string;
  bookedTimeSlots: bookingTime[];
  updatedAt?: string;
  active?: any;
  address?: string;
  provider?: string;
  user?: any;
  createdAt?: string;
  hide?: boolean;
}

export interface bookingTime {
  from: string;
  to: string;
}

export interface IUser {
  username: string;
  password: string;
}

export interface IRegister {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  role: string;
}

export interface IBooking {
  _id?: string;
  userid?: any;
  carid?: any;
  totalHours: number;
  totalMoney: number;
  token?: any;
  driverRequired: string;
  bookedTimeSlots: bookingTime;
  statusPayment?: number;
  approve?: number;
  createdAt?: string;
}

export interface IBookingStore {
  _id: string;
  userid: string;
  carid?: any;
  totalHours: number;
  totalMoney: number;
  token?: any;
  driverRequired: string;
  bookedTimeSlots: bookingTime;
  statusPayment?: number;
  approve?: number;
  createdAt?: string;
}
export interface AddCar {
  name: string;
  capacity: number;
  fuelType: number;
  yearCreated: number;
  autoMarket: string;
  price: number;
  numbereatSeats?: number;
  origin: string;
  image?: any;
  status: number;
  colorOutSide: string;
  colorInSide: string;
  consumeFuel: string;
  doorNumber: number;
  popular?: true;
  gear: number;
  note: string;
  address?: string;
  provider?: string;
  user?: string;
  hide?: boolean;
}

export interface IAutoMaker {
  _id: string;
  name_automaker: string;
  id_category: string;
}

export interface CreateAutoMaker {
  name_automaker: string;
  id_category: string;
}
export interface UpdateCar {
  _id?: string;
  name: string;
  capacity: number;
  fuelType: number;
  yearCreated: number;
  autoMarket: string;
  price: number;
  numbereatSeats: number;
  origin: string;
  image: string;
  status: number;
  colorOutSide: string;
  colorInSide: string;
  consumeFuel: string;
  doorNumber: number;
  popular: true;
  gear: number;
  note: string;
  bookedTimeSlots?: any;
  address?: string;
  provider?: string;
  user?: string;
  hide?: boolean;
}
export interface IUserData {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password?: string;
  phone: string;
  role?: any;
  createdAt?: any;
  nameCustomer?: string;
  tax?: number;
}
export interface Category {
  _id: string;
  name: string;
}
export interface UpdateStatus {
  _id: string;
  status?: number;
  approve?: any;
}

export interface HideShowCar {
  _id: string;
  hide: boolean;
}
export interface pageSearch {
  page: number;
  limit: number;
  sort: string;
  search: string;
}
export interface BlogCategory {
  _id?: string;
  title: string;
  description: string;
  image?: any;
  createdAt?: string;
}
export interface Blog {
  _id?: string;
  title: string;
  description: string;
  image?: any;
  createdAt?: string;
  numViews?: number;
  category?: string;
  author?: number;
  likes?: any;
}
export interface ProviderData {
  _id: string;
  name: string;
  slug: string;
  type: string;
  name_with_type: string;
  code: string;
}
export interface ApproveCar {
  id?: string;
  active?: number;
}
export interface UpdateBooking {
  id?: string;
  from?: any;
  to?: any;
  driver: any;
}
