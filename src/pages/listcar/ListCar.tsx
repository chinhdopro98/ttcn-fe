import React from "react";
import Back from "../common/Back";
import img from "../../assets/image/car/bg-listcar.jpg";
import MyVehicles from "./general/MyVehicles";
import ListBooking from "./general/ListBooking";
const ListCar = () => {
  return (
    <section>
      <Back
        name="My Vehicles"
        title="Danh sách xe & Danh sách xe thuê"
        cover={img}
      />
      <div className="container">
        <MyVehicles />
        <ListBooking />
      </div>
    </section>
  );
};

export default ListCar;
