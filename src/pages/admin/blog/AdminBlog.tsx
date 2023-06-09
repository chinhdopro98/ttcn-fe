import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hook/hook";
import {
  createBlogCategory,
  getAllBlogCategory,
} from "../../../redux/action/blogAction";
import "./adminblog.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import HeaderAdmin from "../header/HeaderAdmin";
import Button from "@mui/material/Button";
import EditCategoryBlog from "../../../components/component/blog/EditCategoryBlog";
import DeleteBlogCategory from "../../../components/component/blog/DeleteBlogCategory";
import CreateBlogCategory from "../../../components/component/blog/CreateBlogCategory";
import { closeSnackBar } from "../../../redux/reducer/blogSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
const AdminBlog = () => {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const blogCategorys = useSelector(
    (state: RootState) => state.blog.blogCategorys
  );
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

  useEffect(() => {
    dispatch(getAllBlogCategory());
  }, [dispatch]);
  return (
    <div className="dashboard-content">
      <HeaderAdmin name="Danh mục tin tức" />
      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <CreateBlogCategory />
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
            <th>Edit</th>
            <th>Delete</th>
          </thead>

          {blogCategorys.length !== 0 ? (
            <tbody>
              {blogCategorys.map((blogCategory, index) => (
                <tr key={blogCategory._id}>
                  <td>
                    <span>{index + 1}</span>
                  </td>
                  <td>
                    <span>{blogCategory.title}</span>
                  </td>
                  <td>
                    <div>
                      <img
                        src={`http://localhost:5000/${blogCategory.image}`}
                        className="dashboard-content-avatar"
                        alt={``}
                      />
                    </div>
                  </td>
                  <td>
                    <span>{blogCategory.description}</span>
                  </td>
                  <td>
                    <span>
                      {new Date(blogCategory.createdAt).toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <EditCategoryBlog blogCategory={blogCategory} />
                  </td>
                  <td>
                    <DeleteBlogCategory blogCategory={blogCategory} />
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

export default AdminBlog;
