import React, { useEffect } from "react";
import { useAppDispatch } from "../../../redux/hook/hook";
import { RootState } from "../../../redux/store/store";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { getAllAutoMaker } from "../../../redux/action/autoMakerAction";
import ItemAutomaker from "./ItemAutomaker";

const AdminAutomaker = () => {
  const automakers = useSelector(
    (state: RootState) => state.automaker.automakers
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllAutoMaker());
  }, [dispatch]);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Tên</TableCell>
              <TableCell align="left">Loại</TableCell>
              <TableCell align="left">Sửa</TableCell>
              <TableCell align="left">Xóa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {automakers.map((automaker, index) => (
              <ItemAutomaker automaker={automaker} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminAutomaker;
