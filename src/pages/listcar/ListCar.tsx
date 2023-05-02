import React, { useEffect } from "react";
import Back from "../common/Back";
import img from "../../assets/image/car/bg-listcar.jpg";
import MyVehicles from "./general/MyVehicles";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hook/hook";
import Box from "@mui/material/Box";
import { getCarByUser } from "../../redux/action/carAction";
import { Icar } from "../../interfaces/interface";
import "./style.css";
import { Typography } from "@mui/material";
import {
  getAllBookingOwner,
  getListBooking,
} from "../../redux/action/bookAction";
import OrderBooking from "./general/OrderBooking";
const ListCar = () => {
  const cars = useSelector((state: RootState) => state.car.cars);
  const dispatch = useAppDispatch();
  const bookings = useSelector(
    (state: RootState) => state.booking.listBookings
  );
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
        <table>
          <thead>
            <th>ID</th>
            <th>Tên</th>
            <th>Ảnh</th>
            <th>Bắt đầu</th>
            <th>Kết thúc</th>
            <th>Ngày tạo</th>
            <th>Giá</th>
            <th>Khách hàng</th>
            <th>Trạng thái</th>
            <th>Edit</th>
          </thead>
          {bookings.map((booking, index) => {
            return <OrderBooking booking={booking} />;
          })}
        </table>
      </Box>
    </section>
  );
};

export default ListCar;
