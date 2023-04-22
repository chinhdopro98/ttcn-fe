import React, { useEffect } from "react";
import Back from "../common/Back";
import img from "../../assets/image/car/bg-listcar.jpg";
import MyVehicles from "./general/MyVehicles";
import ListBooking from "./general/ListBooking";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hook/hook";
import Box from "@mui/material/Box";
import { getCarByUser } from "../../redux/action/carAction";
import { Icar } from "../../interfaces/interface";
import "./style.css";
import { Typography } from "@mui/material";
const ListCar = () => {
  const cars = useSelector((state: RootState) => state.car.cars);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCarByUser());
  }, []);
  return (
    <section>
      <Back
        name="My Vehicles"
        title="Danh sách xe & Danh sách xe thuê"
        cover={img}
      />
      <div className="container ">
        <Typography variant="h3" sx={{}} mb={1} mt={3}>
          Danh sách xe của bạn
        </Typography>
        <Box className="content grid4 mtop mtop-50 " sx={{ marginTop: "40px" }}>
          {cars.map((car: Icar) => {
            return <MyVehicles car={car} />;
          })}
        </Box>
        <ListBooking />
      </div>
    </section>
  );
};

export default ListCar;
