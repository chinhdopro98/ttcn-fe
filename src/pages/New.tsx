import React, { useEffect } from "react";
import Card from "./blog/Card";
import Category from "./blog/Category";
import { useAppDispatch } from "../redux/hook/hook";
import { useSelector } from "react-redux";
import { getAllBlog, getAllBlogCategory } from "../redux/action/blogAction";
import { RootState } from "../redux/store/store";

const New = () => {
  const dispatch = useAppDispatch();
  const blogCategorys = useSelector(
    (state: RootState) => state.blog.blogCategorys
  );
  const blogs = useSelector((state: RootState) => state.blog.blogs);

  useEffect(() => {
    dispatch(getAllBlogCategory());
    dispatch(getAllBlog());
  }, [dispatch]);
  return (
    <>
      <Category blogCategorys={blogCategorys} />
      <Card blogs={blogs} blogCategorys={blogCategorys} />
    </>
  );
};

export default New;
