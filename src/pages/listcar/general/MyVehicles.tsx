import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { IAutoMaker, Icar } from "../../../interfaces/interface";
import { useAppDispatch } from "../../../redux/hook/hook";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { Link } from "react-router-dom";
import { getCarByUser } from "../../../redux/action/carAction";
import { getAllAutoMaker } from "../../../redux/action/autoMakerAction";
import EditCar from "../../admin/car/EditCar";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
interface Iprops {
  car: Icar;
}
const MyVehicles: React.FC<Iprops> = (props) => {
  const { car } = props;
  console.log(car);
  const dispatch = useAppDispatch();
  const automakers = useSelector(
    (state: RootState) => state.automaker.automakers
  );
  useEffect(() => {
    dispatch(getAllAutoMaker());
  }, [dispatch]);
  return (
    <div className="box shadow pad-20" key={car._id}>
      <div className="img">
        <img src={`http://localhost:5000/${car.image}`} alt="" />
      </div>
      <div className="text pad-10">
        <div className="category flex ">
          <span
            style={{
              background: "#25b5791a",
              color: "#ff9800",
            }}
          >
            {automakers?.map((automaker: IAutoMaker) =>
              automaker._id === car.autoMarket ? automaker.name_automaker : ""
            )}
          </span>
          <i className="fa fa-heart"></i>
        </div>
        <Box
          sx={{
            display: "flex",
            padding: "5px 0",
            justifyContent: "space-between",
          }}
        >
          <h4>{car.name}</h4>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold" }}
            className="carowner-edit"
          >
            <EditCar car={car} />
          </Typography>
        </Box>
        <p>
          <i className="fa fa-location-dot"></i> {car.origin}
        </p>
      </div>
      <div className="button flex">
        <div>
          <button className="btn2 button-price">
            {car?.price.toLocaleString()}VND
          </button>{" "}
          <label htmlFor="">/1h</label>
        </div>
        <Button
          variant="contained"
          sx={{
            background: `${car.active === "false" ? "red" : ""}`,
          }}
        >
          {" "}
          <span>{car.active === "false" ? "Pending" : "Approve"}</span>
        </Button>
      </div>
    </div>
  );
};

export default MyVehicles;
