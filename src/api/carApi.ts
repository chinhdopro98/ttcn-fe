import instance from "./axios";
import { URL } from "../constains/url";
import {
  AddCar,
  ApproveCar,
  Icar,
  UpdateCar,
  pageSearch,
} from "../interfaces/interface";
import axios from "axios";
import { Update } from "@reduxjs/toolkit";

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
export const deleteCarApi = async (id: string) => {
  try {
    const response = await instance.delete(`${URL.DELETE_CAR}/${id}`);
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
export const createCarFormDataApi = async ({
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
  provider,
  address,
}: AddCar) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("capacity", capacity.toString());
    formData.append("fuelType", fuelType.toString());
    formData.append("yearCreated", yearCreated.toString());
    formData.append("autoMarket", autoMarket);
    formData.append("price", price.toString());
    formData.append("origin", origin);
    formData.append("colorOutSide", colorOutSide);
    formData.append("colorInSide", colorInSide);
    formData.append("consumeFuel", consumeFuel);
    formData.append("doorNumber", doorNumber.toString());
    formData.append("gear", gear.toString());
    formData.append("note", note);
    formData.append("status", status.toString());
    formData.append("provider", provider.toString());
    formData.append("address", address.toString());
    const response = await axios.post(
      `http://localhost:5000/api/${URL.CREATE_CAR}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "Application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const updateCarFormDataApi = async ({
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
  provider,
  address,
}: UpdateCar) => {
  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("image", image);
    formData.append("capacity", capacity.toString());
    formData.append("fuelType", fuelType.toString());
    formData.append("yearCreated", yearCreated.toString());
    formData.append("autoMarket", autoMarket);
    formData.append("price", price.toString());
    formData.append("origin", origin);
    formData.append("colorOutSide", colorOutSide);
    formData.append("colorInSide", colorInSide);
    formData.append("consumeFuel", consumeFuel);
    formData.append("doorNumber", doorNumber.toString());
    formData.append("gear", gear.toString());
    formData.append("note", note);
    formData.append("status", status.toString());
    formData.append("provider", provider);
    formData.append("address", address);
    const response = await axios.patch(
      `http://localhost:5000/api/${URL.UPDATE_CAR}/${_id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "Application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const findCarUser = async () => {
  try {
    const response = await instance.get(`${URL.GET_CAR_USER}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const approveCarApi = async ({ id, active }: ApproveCar) => {
  try {
    const response = await instance.patch(`${URL.APPROVE_CAR}/${id}`, {
      active,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
