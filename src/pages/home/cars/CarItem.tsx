import React, { useEffect } from "react";
import { IAutoMaker, Icar } from "../../../interfaces/interface";
import "./cars.css";
import { useAppDispatch } from "../../../redux/hook/hook";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { getAllAutoMaker } from "../../../redux/action/autoMakerAction";
import { Link } from "react-router-dom";
import { getAllProvider } from "../../../redux/action/providerAction";
import { Box, Chip } from "@mui/material";
interface Iprops {
  car: Icar;
}
const CarItem: React.FC<Iprops> = (props) => {
  const { car } = props;
  const dispatch = useAppDispatch();
  const automakers = useSelector(
    (state: RootState) => state.automaker.automakers
  );
  const providers = useSelector((state: RootState) => state.provider.providers);
  useEffect(() => {
    dispatch(getAllAutoMaker());
    dispatch(getAllProvider());
  }, [dispatch]);
  return (
    <div className="box shadow" key={car._id}>
      <div className="img">
        <img src={`http://localhost:5000/${car.image}`} alt="" />
      </div>
      <div className="text">
        <div className="category flex">
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
        <h4>
          <Link to={`booking/${car._id}`}>{car.name}</Link>
        </h4>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p>
            <i className="fa fa-location-dot"></i>{" "}
            {providers?.map((provider) =>
              provider._id === car.provider ? provider.name : ""
            )}
          </p>
          <Box sx={{ display: "flex" }}>
            <Chip
              label={
                car?.fuelType === 1
                  ? "Xăng"
                  : car?.fuelType === 2
                  ? "Dầu"
                  : "Điện"
              }
              color="success"
              sx={{ marginRight: "10px" }}
            />
            <Chip
              label={car?.yearCreated}
              color="secondary"
              sx={{ marginRight: "10px" }}
            />
            <Chip label={car?.origin} color="primary" />
          </Box>
        </Box>
      </div>
      <div className="button flex">
        <div>
          <button className="btn2 button-price">
            <Link to={`booking/${car._id}`}>
              {car?.price.toLocaleString()}VND
            </Link>
          </button>{" "}
          <label htmlFor="">/1h</label>
        </div>
        <span>
          {automakers?.map((automaker: IAutoMaker) =>
            automaker._id === car.autoMarket ? automaker.name_automaker : ""
          )}
        </span>
      </div>
    </div>
  );
};

export default CarItem;
