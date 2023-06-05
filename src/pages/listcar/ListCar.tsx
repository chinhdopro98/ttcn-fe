import React, { useEffect } from "react";
import Back from "../common/Back";
import img from "../../assets/image/car/bg-listcar.jpg";
import MyVehicles from "./general/MyVehicles";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hook/hook";
import { Box, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { getCarByUser } from "../../redux/action/carAction";
import { Icar } from "../../interfaces/interface";
import "./style.css";
import { Typography } from "@mui/material";
import {
  getAllBookingOwner,
  getListBooking,
} from "../../redux/action/bookAction";
import OrderBooking from "./general/OrderBooking";
import { closeSnackBar } from "../../redux/reducer/bookingSlice";
const ListCar = () => {
  const cars = useSelector((state: RootState) => state.car.cars);
  const dispatch = useAppDispatch();

  const labelSuccess = useSelector(
    (state: RootState) => state.booking.labelSuccess
  );
  const labelError = useSelector((state: RootState) => state.booking.error);
  const openSnackbar = useSelector(
    (state: RootState) => state.booking.openSnackbar
  );
  const handleCloseSnackBar = () => {
    dispatch(closeSnackBar());
  };
  useEffect(() => {
    dispatch(getCarByUser());
    dispatch(getAllBookingOwner());
  }, []);
  return (
    <section>
      <Back
        name="My Vehicles"
        title="Danh sách xe & Danh sách xe thuê"
        cover={img}
      />
      <div className="container ">
        <Typography variant="h4" sx={{}} mb={1} mt={3}>
          Danh sách xe của bạn
        </Typography>
        <Box className="content grid3 mtop mtop-50 " sx={{ marginTop: "25px" }}>
          {cars.map((car: Icar) => {
            return <MyVehicles car={car} />;
          })}
        </Box>
      </div>
      <Box sx={{ marginTop: "25px", padding: "20px 40px" }}>
        <Typography
          variant="h3"
          mb={1}
          sx={{
            fontSize: "26px",
            fontWeight: "bold",
            textAlign: "center",
            padding: "0 0 40px 0",
          }}
        >
          DANH SÁCH XE ĐÃ ĐƯỢC ĐẶT
        </Typography>

        <OrderBooking />
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={openSnackbar}
        autoHideDuration={5000}
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
      </Snackbar>
    </section>
  );
};

export default ListCar;
