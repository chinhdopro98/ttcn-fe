import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IUserData } from "../../../interfaces/interface";
import { getAllUser } from "../../../redux/action/userAction";
import { useAppDispatch } from "../../../redux/hook/hook";
import { RootState } from "../../../redux/store/store";
import ItemUser from "./ItemUser";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditUser from "./EditUser";
import HeaderAdmin from "../header/HeaderAdmin";
import AddUser from "./AddUser";
import { Box, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { closeSnackBar } from "../../../redux/reducer/carSlice";
interface Iprops {
  user: IUserData;
}
const AdminUser = () => {
  const [search, setSearch] = useState("");
  const users = useSelector((state: RootState) => state.user.userInfos);
  const dispatch = useAppDispatch();
  const labelSuccess = useSelector(
    (state: RootState) => state.car.labelSuccess
  );
  const labelError = useSelector((state: RootState) => state.car.error);
  const openSnackbar = useSelector(
    (state: RootState) => state.car.openSnackbar
  );
  const handleCloseSnackBar = () => {
    dispatch(closeSnackBar());
  };
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  return (
    <>
      <div className="dashboard-content">
        <HeaderAdmin name="List User" />
        <div className="dashboard-content-container">
          <div className="dashboard-content-header">
            <AddUser />
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
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Ngày tạo</th>
              <th>Người dùng</th>
              <th>Edit</th>
              <th>Delete</th>
            </thead>

            {users.length !== 0 ? (
              <tbody>
                {users.map((user, index) => (
                  <ItemUser user={user} index={index} />
                ))}
              </tbody>
            ) : null}
          </table>
        </div>
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
    </>
  );
};

export default AdminUser;
