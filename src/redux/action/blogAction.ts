import { createAsyncThunk } from "@reduxjs/toolkit";
import { BlogCategory } from "../../interfaces/interface";
import { createCategoryBlogApi } from "../../api/blogApi";

export const createBlogCategory = createAsyncThunk(
  "blogCategory/create",
  async (data: BlogCategory, { rejectWithValue }) => {
    try {
      console.log(data);
      const res = await createCategoryBlogApi(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
