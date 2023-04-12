import instance from "./axios";
import { URL } from "../constains/url";
import { AddCar, Icar, UpdateCar, pageSearch } from "../interfaces/interface";

export const getAll = async (data: pageSearch) => {
  try {
    const response = await instance.get(
      `${URL.GET_CAR}?page=${data.page}&limit=${data.limit}&sort=${data.sort}&search=${data.search}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const createCarApi = async ({
  name,
  image,
  capacity,
  fuelType,
  yearCreated,
  autoMarket,
  price,
  numbereatSeats,
  origin,
  colorOutSide,
  colorInSide,
  consumeFuel,
  doorNumber,
  popular,
  gear,
  note,
  status,
}: AddCar) => {
  try {
    const response = await instance.post(URL.ADD_CAR, {
      name,
      image,
      capacity,
      fuelType,
      yearCreated,
      autoMarket,
      price,
      numbereatSeats,
      origin,
      colorOutSide,
      colorInSide,
      consumeFuel,
      doorNumber,
      popular,
      gear,
      note,
      status,
      bookedTimeSlots: [],
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const updateCarApi = async ({
  name,
  image,
  capacity,
  fuelType,
  yearCreated,
  autoMarket,
  price,
  numbereatSeats,
  origin,
  colorOutSide,
  colorInSide,
  consumeFuel,
  doorNumber,
  popular,
  gear,
  note,
  status,
  _id,
}: UpdateCar) => {
  try {
    const response = await instance.post(URL.EDIT_CAR, {
      _id,
      name,
      image,
      capacity,
      fuelType,
      yearCreated,
      autoMarket,
      price,
      numbereatSeats,
      origin,
      colorOutSide,
      colorInSide,
      consumeFuel,
      doorNumber,
      popular,
      gear,
      note,
      status,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const deleteCarApi = async (data: Icar) => {
  try {
    const response = await instance.post(URL.DELETE_CAR, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const getOneCar = async (id: string) => {
  try {
    const response = await instance.get(`${URL.GET_ONE_CAR}/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
