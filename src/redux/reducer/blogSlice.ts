import { createSlice } from "@reduxjs/toolkit";
import { BlogCategory } from "../../interfaces/interface";
import { createBlogCategory } from "../action/blogAction";
interface BlogState {
  blogCategorys: BlogCategory[];
  blogCategory: BlogCategory;
}
const initialState: BlogState = {
  blogCategorys: [],
  blogCategory: null,
};
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBlogCategory.fulfilled, (state, action) => {
      console.log(action.payload.data);
      state.blogCategory = action.payload.data;
    });
  },
});
export const {} = blogSlice.actions;
export default blogSlice.reducer;
