import React, { useEffect } from "react";
import "./style.css";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook/hook";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { getOneBlog } from "../../redux/action/blogAction";

const DetailBlog = () => {
  const dispatch = useAppDispatch();
  const blog = useSelector((state: RootState) => state.blog.blog);
  const paramId = useParams();
  useEffect(() => {
    dispatch(getOneBlog(paramId.newid));
  }, [dispatch]);
  if (!blog) {
    return <div>Loading...</div>;
  }
  return (
    <div className="singlePage">
      <div className="container">
        <div className="left">
          <img src={`http://localhost:5000/${blog.image}`} alt="" />
        </div>
        <div className="right">
          {/* <div className="buttons">
            <button className="button">
              <BsPencilSquare />
            </button>
            <button className="button">
              <AiOutlineDelete />
            </button>
          </div> */}
          <h1>{blog.title}</h1>
          <p>{blog.description}</p>
          <p>Author: admin</p>
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;
