import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  approveCarApi,
  createCarApi,
  createCarFormDataApi,
  deleteCarApi,
  findCarUser,
  getAll,
  getOneCar,
  hideShowCarApi,
  updateCarApi,
  updateCarFormDataApi,
} from "../../api/carApi";
import {
  AddCar,
  ApproveCar,
  HideShowCar,
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
export const createCarFormdata = createAsyncThunk(
  "car/createCar",
  async (data: AddCar, { rejectWithValue }) => {
    try {
      const res = await createCarFormDataApi(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createCar = createAsyncThunk(
  "car/addCar",
  async (data: AddCar, { rejectWithValue }) => {
    try {
      const res = await createCarApi(data);
      return res.data;
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
export const updateCar = createAsyncThunk(
  "car/updateCar",
  async (data: UpdateCar, { rejectWithValue }) => {
    try {
      const res = await updateCarFormDataApi(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteCar = createAsyncThunk(
  "car/deleteCar",
  async (id: string, { rejectWithValue }) => {
    console.log(id);
    try {
      const res = await deleteCarApi(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getCarByUser = createAsyncThunk(
  "car/get-by-user",
  async (arg, { rejectWithValue }) => {
    try {
      const data = await findCarUser();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const approveCar = createAsyncThunk(
  "car/approve",
  async (dataAprove: ApproveCar, { rejectWithValue }) => {
    try {
      const data = await approveCarApi(dataAprove);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);
export const hideShowCar = createAsyncThunk(
  "car/hide-show",
  async (dataHide: HideShowCar, { rejectWithValue }) => {
    try {
      const data = await hideShowCarApi(dataHide);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);
