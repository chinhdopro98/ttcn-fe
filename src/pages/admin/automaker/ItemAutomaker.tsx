import React, { useEffect } from "react";
import { IAutoMaker } from "../../../interfaces/interface";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { RootState } from "../../../redux/store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/hook/hook";
import { getAllCategory } from "../../../redux/action/autoMakerAction";
import EditAutomaker from "./EditAutomaker";
import DeleteAutomaker from "./DeleteAutomaker";
interface Iprops {
  automaker: IAutoMaker;
  index: number;
}
const ItemAutomaker: React.FC<Iprops> = (props) => {
  const { automaker, index } = props;
  const categorys = useSelector(
    (state: RootState) => state.automaker.categorys
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);
  return (
    <TableRow
      key={automaker._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="category">
        {index + 1}
      </TableCell>
      <TableCell align="left">{automaker.name_automaker}</TableCell>
      <TableCell align="left">
        {categorys.map((category) => {
          if (category._id === automaker.id_category) {
            return category.name;
          }
        })}
      </TableCell>
      <TableCell align="left">
        <EditAutomaker automaker={automaker} categorys={categorys} />
      </TableCell>
      <TableCell align="left">
        <DeleteAutomaker automaker={automaker} />
      </TableCell>
    </TableRow>
  );
};

export default ItemAutomaker;
