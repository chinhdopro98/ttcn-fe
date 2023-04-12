import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBookingApi,
  getAllBooking,
  newBookingCarApi,
  updateStatusBookingApi,
} from "../../api/bookingApi";
import { IBooking, UpdateStatus } from "../../interfaces/interface";
export const bookingCar = createAsyncThunk(
  "bookingCar/create",
  async (data: IBooking, { rejectWithValue }) => {
    try {
      const res = await newBookingCarApi(data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getListBooking = createAsyncThunk(
  "bookingCar/getListBooking",
  async (arg, { rejectWithValue }) => {
    try {
      const data = await getAllBooking();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);
export const createBookingCar = createAsyncThunk(
  "bookingCar/createBooking",
  async (data: IBooking, { rejectWithValue }) => {
    try {
      const res = await createBookingApi(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateBookingCar = createAsyncThunk(
  "bookingCar/update-book",
  async (data: UpdateStatus, { rejectWithValue }) => {
    try {
      const res = await updateStatusBookingApi(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
