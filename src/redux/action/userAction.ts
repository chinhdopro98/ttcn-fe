import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteUserApi,
  getAllUserApi,
  loginApi,
  registerApi,
  updateProfileApi,
  updateUserApi,
} from "../../api/userApi";
import { IRegister, IUser, IUserData } from "../../interfaces/interface";
export const userLogin = createAsyncThunk(
  "users/login",
  async (data: IUser, { rejectWithValue }) => {
    try {
      const res = await loginApi(data);
      localStorage.setItem("user", JSON.stringify(res));
      if (JSON.parse(JSON.stringify(res)).token) {
        localStorage.setItem("token", JSON.parse(JSON.stringify(res)).token);
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const userRegister = createAsyncThunk(
  "users/register",
  async (data: IRegister, { rejectWithValue }) => {
    try {
      const res = await registerApi(data);
      localStorage.setItem("user", JSON.stringify(res));
      if (JSON.parse(JSON.stringify(res)).token) {
        localStorage.setItem("token", JSON.parse(JSON.stringify(res)).token);
      }
      return res;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);
export const getAllUser = createAsyncThunk(
  "user/getall",
  async (arg, { rejectWithValue }) => {
    try {
      const data = await getAllUserApi();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);
export const updateUser = createAsyncThunk(
  "user/update",
  async (data: IUserData, { rejectWithValue }) => {
    try {
      const res = await updateUserApi(data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (data: IUserData, { rejectWithValue }) => {
    try {
      const res = await deleteUserApi(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const updateProfile = createAsyncThunk(
  "user/update-profile",
  async (data: IUserData, { rejectWithValue }) => {
    try {
      const res = await updateProfileApi(data);
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(res.data.updateUser));
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
