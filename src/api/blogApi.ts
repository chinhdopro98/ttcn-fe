import axios from "axios";
import { URL } from "../constains/url";
import { Blog, BlogCategory } from "../interfaces/interface";
import instance from "./axios";
export const createCategoryBlogApi = async ({
  title,
  description,
  image,
}: BlogCategory) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    const response = await axios.post(
      `http://localhost:5000/api/${URL.CREATE_BLOG_CATEGORY}`,
      formData,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "Application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const updateCategoryBlogApi = async ({
  _id,
  title,
  description,
  image,
}: BlogCategory) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    const response = await axios.patch(
      `http://localhost:5000/api/${URL.UPDATE_BLOG_CATEGORY}/${_id}`,
      formData,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "Application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const getAllCategoryBlogApi = async () => {
  try {
    const response = await instance.get(`${URL.GET_ALL_BLOG_CATEGORY}`);
    return response.data.getCategoryBlogs;
  } catch (err) {
    console.log(err);
  }
};

export const deleteBlogCategoryApi = async (id: string) => {
  try {
    const response = await instance.delete(`${URL.DELETE_BLOG_CATEGORY}/${id}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};

//Blog
export const createBlogApi = async ({
  title,
  description,
  image,
  category,
}: Blog) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("category", category);
    const response = await axios.post(
      `http://localhost:5000/api/${URL.CREATE_BLOG}`,
      formData,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "Application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const getAllBlogApi = async () => {
  try {
    const response = await instance.get(`${URL.GET_ALL_BLOG}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const updateBlogApi = async ({
  _id,
  title,
  description,
  image,
  category,
}: Blog) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("category", category);
    const response = await axios.patch(
      `http://localhost:5000/api/${URL.UPDATE_BLOG}/${_id}`,
      formData,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "Application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const deleteBlogApi = async (id: string) => {
  try {
    const response = await instance.delete(`${URL.DELETE_BLOG}/${id}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const getOneBlogApi = async (id: string) => {
  try {
    const response = await instance.get(`${URL.GET_ONE_BLOG}/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
