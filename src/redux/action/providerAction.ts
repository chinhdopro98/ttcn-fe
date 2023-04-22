import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProviderApi } from "../../api/providerApi";

export const getAllProvider = createAsyncThunk(
  "provider/getAll",
  async (arg, { rejectWithValue }) => {
    try {
      const data = await getAllProviderApi();
      return data.providers;
    } catch (err) {
      console.error(err);
    }
  }
);
