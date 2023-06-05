import { createSlice } from "@reduxjs/toolkit";
import { Blog, BlogCategory } from "../../interfaces/interface";
import {
  createBlog,
  createBlogCategory,
  deleteBlog,
  deleteBlogCategory,
  getAllBlog,
  getAllBlogCategory,
  getOneBlog,
  updateBlog,
  updateBlogCategory,
} from "../action/blogAction";
interface BlogState {
  blogCategorys: BlogCategory[];
  blogs: Blog[];
  blogCategory: BlogCategory;
  blog: Blog;
  openSnackbar: boolean;
  labelSuccess: string;
  error: string;
}
const initialState: BlogState = {
  blogCategorys: [],
  blogCategory: null,
  blogs: [],
  blog: null,
  labelSuccess: "",
  openSnackbar: false,
  error: "",
};
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    closeSnackBar: (state) => {
      state.openSnackbar = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createBlogCategory.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        state.blogCategorys.push({
          _id: action.payload.newBlogCategory._id,
          title: action.payload.newBlogCategory.title,
          description: action.payload.newBlogCategory.description,
          image: action.payload.newBlogCategory.image,
          createdAt: action.payload.newBlogCategory.createdAt,
        });
        state.error = "";
        state.labelSuccess = "Thêm danh mục tin tức thành công!";
        state.openSnackbar = true;
      }
    });
    builder.addCase(getAllBlogCategory.fulfilled, (state, action) => {
      state.blogCategorys = action.payload;
    });
    builder.addCase(updateBlogCategory.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        state.blogCategorys = state.blogCategorys.map((item) => {
          if (item._id === action.payload.updateBlogCategory.id) {
            return {
              _id: action.payload.updateBlogCategory._id,
              title: action.payload.updateBlogCategory.title,
              description: action.payload.updateBlogCategory.description,
              image: action.payload.updateBlogCategory.image,
            };
          }
          return item;
        });
        state.error = "";
        state.labelSuccess = "Cập nhật danh mục tin tức thành công!";
        state.openSnackbar = true;
      }
    });
    builder.addCase(deleteBlogCategory.fulfilled, (state, action) => {
      if (action.payload.data.status === "success") {
        if (action.payload.data.id) {
          state.blogCategorys = state.blogCategorys.filter(
            (item) => item._id !== action.payload.data.id
          );
        }
        state.error = "";
        state.labelSuccess = "Xóa danh mụctin tức thành công!";
        state.openSnackbar = true;
      }
    });

    // blog
    builder.addCase(getOneBlog.fulfilled, (state, { payload }) => {
      state.blog = payload.getBlog;
    });
    builder.addCase(getOneBlog.rejected, (state, { payload }) => {});
    builder.addCase(createBlog.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        state.blogs.push({
          _id: action.payload.newBlog._id,
          title: action.payload.newBlog.title,
          description: action.payload.newBlog.description,
          image: action.payload.newBlog.image,
          createdAt: action.payload.newBlog.createdAt,
          numViews: action.payload.newBlog.numViews,
          likes: action.payload.newBlog.likes,
        });
        state.error = "";
        state.labelSuccess = "Thêm tin tức thành công!";
        state.openSnackbar = true;
      }
    });
    builder.addCase(getAllBlog.fulfilled, (state, action) => {
      state.blogs = action.payload;
    });
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        state.error = "";
        state.labelSuccess = "Cập nhật tin tức thành công!";
        state.openSnackbar = true;
        state.blogs = state.blogs.map((item) => {
          if (item._id === action.payload.updateBlog._id) {
            return {
              _id: action.payload.updateBlog._id,
              title: action.payload.updateBlog.title,
              description: action.payload.updateBlog.description,
              category: action.payload.updateBlog.category,
              image: action.payload.updateBlog.image,
              numViews: action.payload.updateBlog.numViews,
              likes: action.payload.updateBlog.likes,
            };
          }
          return item;
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
        state.error = "";
        state.labelSuccess = "Xóa tin tức thành công!";
        state.openSnackbar = true;
      }
    });
  },
});
export const { closeSnackBar } = blogSlice.actions;
export default blogSlice.reducer;
