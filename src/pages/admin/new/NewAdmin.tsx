import React, { useEffect, useState } from "react";
import HeaderAdmin from "../header/HeaderAdmin";
import { useAppDispatch } from "../../../redux/hook/hook";
import Create from "../../../components/component/new/Create";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import {
  getAllBlog,
  getAllBlogCategory,
} from "../../../redux/action/blogAction";
import { BlogCategory } from "../../../interfaces/interface";
import Edit from "../../../components/component/new/Edit";
import Delete from "../../../components/component/new/Delete";
import { closeSnackBar } from "../../../redux/reducer/blogSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
const NewAdmin = () => {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const blogCategories = useSelector(
    (state: RootState) => state.blog.blogCategorys
  );
  useEffect(() => {
    dispatch(getAllBlogCategory());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllBlog());
  }, [dispatch]);
  const labelSuccess = useSelector(
    (state: RootState) => state.blog.labelSuccess
  );
  const labelError = useSelector((state: RootState) => state.blog.error);
  const openSnackbar = useSelector(
    (state: RootState) => state.blog.openSnackbar
  );
  const handleCloseSnackBar = () => {
    dispatch(closeSnackBar());
  };
  return (
    <div className="dashboard-content">
      <HeaderAdmin name="Tin tức" />
      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <Create />
          <div className="dashboard-content-search">
            <input
              type="text"
              value={search}
              placeholder="Search.."
              className="dashboard-content-input"
            />
          </div>
        </div>

        <table>
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Create Date</th>
            <th>Category</th>
            <th>View</th>
            <th>Heart</th>
            <th>Edit</th>
            <th>Delete</th>
          </thead>

          {blogs.length !== 0 ? (
            <tbody>
              {blogs.map((blog, index) => (
                <tr key={blog._id}>
                  <td>
                    <span>{index + 1}</span>
                  </td>
                  <td>
                    <span>{blog.title}</span>
                  </td>
                  <td>
                    <div className="dashboard-content-avatar">
                      <img
                        src={`http://localhost:5000/${blog.image}`}
                        alt={``}
                      />
                    </div>
                  </td>
                  <td>
                    <span>{blog.description.slice(0, 80)}...</span>
                  </td>
                  <td>
                    <span>{new Date(blog.createdAt).toLocaleString()}</span>
                  </td>
                  <td>
                    <span>
                      {blogCategories?.map((blogCategorie: BlogCategory) =>
                        blogCategorie._id === blog.category
                          ? blogCategorie.title
                          : ""
                      )}
                    </span>
                  </td>
                  <td>
                    <span>{blog.numViews}</span>
                  </td>
                  <td>
                    <span>{blog.likes.length}</span>
                  </td>
                  <td>
                    <Edit blog={blog} />
                  </td>
                  <td>
                    <Delete blog={blog} />
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackBar}
      >
        <Box>
          {labelSuccess && (
            <MuiAlert
              onClose={handleCloseSnackBar}
              variant="filled"
              severity="success"
            >
              {labelSuccess}
            </MuiAlert>
          )}
          {labelError && (
            <MuiAlert
              onClose={handleCloseSnackBar}
              variant="filled"
              severity="error"
            >
              {labelError}
            </MuiAlert>
          )}
        </Box>
      </Snackbar>{" "}
    </div>
  );
};

export default NewAdmin;
