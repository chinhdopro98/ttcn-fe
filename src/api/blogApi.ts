import axios from "axios";
import { URL } from "../constains/url";
import { BlogCategory } from "../interfaces/interface";
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
