import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCar } from "../../../redux/action/carAction";
import { useAppDispatch } from "../../../redux/hook/hook";
import { RootState } from "../../../redux/store/store";
import Box from "@mui/material/Box";
import { Icar } from "../../../interfaces/interface";
import ItemCar from "./ItemCar";
import Typography from "@mui/material/Typography";
import AddVehicle from "../../AddVehicle";
import { getAllAutoMaker } from "../../../redux/action/autoMakerAction";
const AdminCar = () => {
  const cars = useSelector((state: RootState) => state.car.cars);
  const dispatch = useAppDispatch();
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
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box
        sx={{
          width: "calc(100% - 650px)",
          padding: "20px 25px",
          borderRight: "1px solid #ccc",
          borderTop: "1px solid #ccc",
          borderBottom: "1px solid #ccc",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h4"
          mb={1}
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "left",
            marginBottom: "20px",
          }}
        >
          LISt CARS
        </Typography>
        {cars.map((car: Icar) => (
          <ItemCar car={car} />
        ))}
        Total: {cars.length}
      </Box>
      <Box
        sx={{
          width: "650px",
          paddingRight: "20px",
          borderTop: "1px solid #ccc",
          borderBottom: "1px solid #ccc",
          paddingLeft: "20px",
        }}
      >
        <Typography
          variant="h4"
          mb={1}
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "left",
            marginBottom: "20px",
          }}
        >
          ADD CAR
        </Typography>
        <AddVehicle />
      </Box>
    </Box>
  );
};

export default AdminCar;
