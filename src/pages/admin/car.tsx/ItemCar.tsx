import React, { useEffect } from "react";
import { IAutoMaker, Icar } from "../../../interfaces/interface";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { RootState } from "../../../redux/store/store";
import { useAppDispatch } from "../../../redux/hook/hook";
import { getAllAutoMaker } from "../../../redux/action/autoMakerAction";
import { useSelector } from "react-redux";
import EditCar from "./EditCar";
import DeleteCar from "./DeleteCar";
interface Iprops {
  car: Icar;
}
const ItemCar: React.FC<Iprops> = (props) => {
  const { car } = props;
  const dispatch = useAppDispatch();
  const automakers = useSelector(
    (state: RootState) => state.automaker.automakers
  );
  useEffect(() => {
    dispatch(getAllAutoMaker());
  }, [dispatch]);
  return (
    <Box sx={{ display: "flex", marginBottom: "40px" }}>
      <Box
        sx={{ display: "block", width: 150, height: 120, marginRight: "30px" }}
      >
        <img
          src={require(`../../../assets/image/car/${car.image}`)}
          alt=""
          className="carimg w-full h-full"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "calc(100% - 150px - 30px) !important",
        }}
      >
        <Box>
          <Typography variant="h5" mb={1} sx={{ fontSize: "16px" }}>
            Name: {car?.name}
          </Typography>

          <Typography
            variant="h6"
            mb={1}
            sx={{ fontSize: "15px", textAlign: "left" }}
          >
            Price: {car?.price.toLocaleString()}VND/1h
          </Typography>
          <Typography
            variant="h6"
            mb={1}
            sx={{ fontSize: "15px", textAlign: "left" }}
          >
            Auto Maker:{" "}
            {automakers?.map((automaker: IAutoMaker) =>
              automaker._id === car.autoMarket ? automaker.name_automaker : ""
            )}
          </Typography>
        </Box>
        <Box sx={{ display: "block", justifyContent: "right" }}>
          <EditCar car={car} />
          <DeleteCar car={car} />
        </Box>
      </Box>
    </Box>
  );
};

export default ItemCar;
