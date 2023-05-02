import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAutomakerApi,
  deleteAutomakerApi,
  getAllAutoMakerApi,
  getAllCategorysApi,
  updateAutomakerApi,
} from "../../api/autoMakerApi";
import { CreateAutoMaker, IAutoMaker } from "../../interfaces/interface";
export const getAllAutoMaker = createAsyncThunk(
  "automaker/getAll",
  async (arg, { rejectWithValue }) => {
    try {
      const data = await getAllAutoMakerApi();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getAllCategory = createAsyncThunk(
  "categorys/getAll",
  async (arg, { rejectWithValue }) => {
    try {
      const data = await getAllCategorysApi();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);
export const updateAutomaker = createAsyncThunk(
  "automaker/update",
  async (data: IAutoMaker, { rejectWithValue }) => {
    try {
      const res = await updateAutomakerApi(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteAutomaker = createAsyncThunk(
  "automaker/delete",
  async (data: IAutoMaker, { rejectWithValue }) => {
    try {
      const res = await deleteAutomakerApi(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createAutomaker = createAsyncThunk(
  "automaker/create",
  async (data: CreateAutoMaker, { rejectWithValue }) => {
    console.log(data);
    try {
      const res = await createAutomakerApi(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
