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
  userid: string;
  carid?: any;
  totalHours: number;
  totalMoney: number;
  token?: any;
  driverRequired: string;
  bookedTimeSlots: bookingTime;
  statusPayment?: number;
  approve?: number;
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
}
export interface AddCar {
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
}
export interface IUserData {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  role: string;
}
export interface Category {
  _id: string;
  name: string;
}
export interface UpdateStatus {
  _id: string;
  status: number;
}
export interface pageSearch {
  page: number;
  limit: number;
  sort: string;
  search: string;
}
