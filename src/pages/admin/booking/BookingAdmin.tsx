import React, { useEffect, useState } from "react";
import HeaderAdmin from "../header/HeaderAdmin";
import CreateCarAdmin from "../../../components/component/car/CreateCarAdmin";
import { useAppDispatch } from "../../../redux/hook/hook";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { closeSnackBar } from "../../../redux/reducer/carSlice";
import { getAllAutoMaker } from "../../../redux/action/autoMakerAction";
import { Box, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import moment from "moment";
import ItemBooking from "./ItemBooking";
import { getAllBooking } from "../../../api/bookingApi";
import { getListBooking } from "../../../redux/action/bookAction";

const BookingAdmin = () => {
  const [search, setSearch] = useState("");
  const bookings = useSelector(
    (state: RootState) => state.booking.listBookings
  );
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
    dispatch(getListBooking());
    dispatch(getAllAutoMaker());
  }, [dispatch]);
  return (
    <>
      <div className="dashboard-content">
        <HeaderAdmin name="List Car" />
        <div className="dashboard-content-container">
          <div className="dashboard-content-header">
            {/* <CreateCarAdmin />
            <div className="dashboard-content-search">
              <input
                type="text"
                value={search}
                placeholder="Search.."
                className="dashboard-content-input"
              />
            </div> */}
          </div>

          <table>
            <thead>
              <th>ID</th>
              <th>Tên</th>
              <th>Ảnh</th>
              <th>Bắt đầu</th>
              <th>Kết thúc</th>
              <th>Ngày tạo</th>
              <th>Người tạo</th>
              <th>Giá</th>
              <th>Trạng thái</th>
              <th>Edit</th>
              <th>Delete</th>
            </thead>

            {bookings.length !== 0 ? (
              <tbody>
                {bookings.map((booking, index) => (
                  <ItemBooking booking={booking} index={index} />
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

export default BookingAdmin;
