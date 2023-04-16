import { createSlice } from "@reduxjs/toolkit";
import { Blog, BlogCategory } from "../../interfaces/interface";
import {
  createBlog,
  createBlogCategory,
  deleteBlog,
  deleteBlogCategory,
  getAllBlog,
  getAllBlogCategory,
  updateBlog,
  updateBlogCategory,
} from "../action/blogAction";
interface BlogState {
  blogCategorys: BlogCategory[];
  blogs: Blog[];
  blogCategory: BlogCategory;
  blog: Blog;
}
const initialState: BlogState = {
  blogCategorys: [],
  blogCategory: null,
  blogs: [],
  blog: null,
};
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBlogCategory.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        state.blogCategorys.push({
          title: action.payload.newBlogCategory.title,
          description: action.payload.newBlogCategory.description,
          image: action.payload.newBlogCategory.image,
          createdAt: action.payload.newBlogCategory.createdAt,
        });
      }
    });
    builder.addCase(getAllBlogCategory.fulfilled, (state, action) => {
      state.blogCategorys = action.payload;
    });
    builder.addCase(updateBlogCategory.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        state.blogCategorys = state.blogCategorys.map((item) => {
          if (item._id === action.payload.updateBlogCategory._id) {
            return {
              title: action.payload.updateBlogCategory.title,
              description: action.payload.updateBlogCategory.description,
              image: action.payload.updateBlogCategory.image,
            };
            return item;
          }
        });
      }
    });
    builder.addCase(deleteBlogCategory.fulfilled, (state, action) => {
      if (action.payload.data.status === "success") {
        if (action.payload.data.id) {
          state.blogCategorys = state.blogCategorys.filter(
            (item) => item._id !== action.payload.data.id
          );
        }
      }
    });

    // blog
    builder.addCase(createBlog.fulfilled, (state, action) => {
      state.blogCategory = action.payload.data;
    });
    builder.addCase(getAllBlog.fulfilled, (state, action) => {
      state.blogs = action.payload;
    });
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        state.blogs = state.blogs.map((item) => {
          if (item._id === action.payload.updateBlog._id) {
            return {
              title: action.payload.updateBlog.title,
              description: action.payload.updateBlog.description,
              category: action.payload.updateBlog.category,
              image: action.payload.updateBlog.image,
              numViews: action.payload.updateBlog.numViews,
              likes: action.payload.updateBlog.likes,
            };
            return item;
          }
        });
      }
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      if (action.payload.data.status === "success") {
        if (action.payload.data.id) {
          state.blogs = state.blogs.filter(
            (item) => item._id !== action.payload.data.id
          );
        }
      }
    });
  },
});
export const {} = blogSlice.actions;
export default blogSlice.reducer;
