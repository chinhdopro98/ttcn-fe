import React from "react";
import { IUserData } from "../../../interfaces/interface";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
interface Iprops {
  user: IUserData;
  index: number;
}

const ItemUser: React.FC<Iprops> = (props) => {
  const { user, index } = props;
  return (
    <TableRow
      key={user.username}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="user">
        {index + 1}
      </TableCell>
      <TableCell align="left">{user.firstname}</TableCell>
      <TableCell align="left">{user.lastname}</TableCell>
      <TableCell align="left">{user.username}</TableCell>
      <TableCell align="left">{user.email}</TableCell>
      <TableCell align="left">{user.phone}</TableCell>
      <TableCell align="left">
        {new Date(user.createdAt).toLocaleString()}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: "capitalize" }}>
        <span
          className={
            user.role === "admin"
              ? "color-red"
              : user.role === "user"
              ? "color-blue"
              : "color-yellow"
          }
        >
          {user.role}
        </span>
      </TableCell>
      <TableCell align="left">
        <EditUser user={user} />
      </TableCell>
      <TableCell align="left">
        <DeleteUser user={user} />
      </TableCell>
    </TableRow>
  );
};

export default ItemUser;
