import React, { useEffect } from "react";
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
interface Iprops {
  user: IUserData;
}
const AdminUser = () => {
  const users = useSelector((state: RootState) => state.user.userInfos);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Full Name</TableCell>
              <TableCell align="left">User Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <ItemUser user={user} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminUser;
