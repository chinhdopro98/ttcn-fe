import { createAsyncThunk } from "@reduxjs/toolkit";
import { Blog, BlogCategory } from "../../interfaces/interface";
import {
  createBlogApi,
  createCategoryBlogApi,
  deleteBlogApi,
  deleteBlogCategoryApi,
  getAllBlogApi,
  getAllCategoryBlogApi,
  getOneBlogApi,
  updateBlogApi,
  updateCategoryBlogApi,
} from "../../api/blogApi";

export const createBlogCategory = createAsyncThunk(
  "blogCategory/create",
  async (data: BlogCategory, { rejectWithValue }) => {
    try {
      const res = await createCategoryBlogApi(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateBlogCategory = createAsyncThunk(
  "blogCategory/update",
  async (data: BlogCategory, { rejectWithValue }) => {
    try {
      const res = await updateCategoryBlogApi(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getAllBlogCategory = createAsyncThunk(
  "blogCategory/getAll",
  async (arg, { rejectWithValue }) => {
    try {
      const data = await getAllCategoryBlogApi();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);
export const deleteBlogCategory = createAsyncThunk(
  "blogCategory/BlogCategory",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteBlogCategoryApi(id);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

//Blog
export const createBlog = createAsyncThunk(
  "blog/create",
  async (data: Blog, { rejectWithValue }) => {
    try {
      const res = await createBlogApi(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getAllBlog = createAsyncThunk(
  "blog/getAll",
  async (arg, { rejectWithValue }) => {
    try {
      const data = await getAllBlogApi();
      return data.getBlogs;
    } catch (err) {
      console.error(err);
    }
  }
);
export const updateBlog = createAsyncThunk(
  "blog/update",
  async (data: Blog, { rejectWithValue }) => {
    try {
      const res = await updateBlogApi(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteBlogApi(id);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getOneBlog = createAsyncThunk(
  "blog/getOne",
  async (id: string, { rejectWithValue }) => {
    console.log(id);
    try {
      const data = await getOneBlogApi(id);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);
