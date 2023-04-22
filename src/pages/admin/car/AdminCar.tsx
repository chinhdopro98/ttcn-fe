import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCar } from "../../../redux/action/carAction";
import { useAppDispatch } from "../../../redux/hook/hook";
import { RootState } from "../../../redux/store/store";
import Box from "@mui/material/Box";
import { Icar } from "../../../interfaces/interface";
import ItemCar from "./ItemCar";
import Typography from "@mui/material/Typography";
import { getAllAutoMaker } from "../../../redux/action/autoMakerAction";
import HeaderAdmin from "../header/HeaderAdmin";
import CreateCarAdmin from "../../../components/component/car/CreateCarAdmin";
import { closeSnackBar } from "../../../redux/reducer/carSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const AdminCar = () => {
  const [search, setSearch] = useState("");
  const cars = useSelector((state: RootState) => state.car.cars);
  const labelSuccess = useSelector(
    (state: RootState) => state.car.labelSuccess
  );
  const labelError = useSelector((state: RootState) => state.car.error);
  const openSnackbar = useSelector(
    (state: RootState) => state.car.openSnackbar
  );
  const dispatch = useAppDispatch();
  const handleCloseSnackBar = () => {
    dispatch(closeSnackBar());
  };
  useEffect(() => {
    dispatch(getAllAutoMaker());
  }, [dispatch]);

  const [page, setPage] = React.useState(1);
  useEffect(() => {
    dispatch(
      getCar({
        page: page,
        limit: 10,
        sort: "",
        search: "",
      })
    );
  }, [dispatch]);
  return (
    <>
      <div className="dashboard-content">
        <HeaderAdmin name="List Car" />
        <div className="dashboard-content-container">
          <div className="dashboard-content-header">
            <CreateCarAdmin />
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
              <th>Tên</th>
              <th>Ảnh</th>
              <th>Price</th>
              <th>Ngày tạo</th>
              <th>Danh mục</th>
              <th>Phê duyệt</th>
              <th>Edit</th>
              <th>Delete</th>
            </thead>

            {cars.length !== 0 ? (
              <tbody>
                {cars.map((car, index) => (
                  <ItemCar car={car} index={index} />
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

export default AdminCar;
