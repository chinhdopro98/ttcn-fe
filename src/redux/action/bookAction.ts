import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBookingApi,
  deleteBookingApi,
  getAllBooking,
  getAllBookingOwnerApi,
  newBookingCarApi,
  updateBookingApi,
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
    console.log(data);
    try {
      const res = await updateStatusBookingApi(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getAllBookingOwner = createAsyncThunk(
  "bookingCar/getListBookingOwner",
  async (arg, { rejectWithValue }) => {
    try {
      const data = await getAllBookingOwnerApi();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);
export const updateBooking = createAsyncThunk(
  "bookingCar/update",
  async (data: IBooking, { rejectWithValue }) => {
    try {
      const res = await updateBookingApi(data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteBooking = createAsyncThunk(
  "bookingCar/delete",
  async (_id: string, { rejectWithValue }) => {
    try {
      const res = await deleteBookingApi(_id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
