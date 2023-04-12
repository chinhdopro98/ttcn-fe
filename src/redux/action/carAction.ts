import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCarApi,
  deleteCarApi,
  getAll,
  getOneCar,
  updateCarApi,
} from "../../api/carApi";
import {
  AddCar,
  Icar,
  UpdateCar,
  pageSearch,
} from "../../interfaces/interface";
export const getCar = createAsyncThunk(
  "car/getCar",
  async (datas: pageSearch, { rejectWithValue }) => {
    try {
      const data = await getAll(datas);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getCarOne = createAsyncThunk(
  "car/get-one",
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await getOneCar(id);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);
export const createCar = createAsyncThunk(
  "car/addCar",
  async (data: AddCar, { rejectWithValue }) => {
    try {
      const res = await createCarApi(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const editCar = createAsyncThunk(
  "car/editCar",
  async (data: UpdateCar, { rejectWithValue }) => {
    try {
      const res = await updateCarApi(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteCar = createAsyncThunk(
  "car/deleteCar",
  async (data: Icar, { rejectWithValue }) => {
    try {
      const res = await deleteCarApi(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
