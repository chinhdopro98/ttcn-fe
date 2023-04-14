import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hook/hook";
import { createBlogCategory } from "../../../redux/action/blogAction";
const AdminBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDesc = (e) => {
    setDesc(e.target.value);
  };
  const handleClick = () => {
    dispatch(createBlogCategory({ title, description, image }));
  };
  return (
    <div className="admin-card">
      <input
        value={title}
        onChange={handleChange}
        placeholder="title"
        className="input-admin"
      />{" "}
      <br />
      <input
        value={description}
        onChange={handleChangeDesc}
        placeholder="description"
        className="input-admin"
      />{" "}
      <br />
      <input
        multiple
        onChange={(e) => setImage(e.target.files[0])}
        type="file"
      />
      <button onClick={handleClick} className="add-btn">
        ADD SERVICE
      </button>
    </div>
  );
};

export default AdminBlog;
