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
import ExpiredCar from "./ExpiredCar";
interface Iprops {
  car: Icar;
  index: number;
}
const ItemCar: React.FC<Iprops> = (props) => {
  const { car, index } = props;
  const dispatch = useAppDispatch();
  const automakers = useSelector(
    (state: RootState) => state.automaker.automakers
  );
  useEffect(() => {
    dispatch(getAllAutoMaker());
  }, [dispatch]);
  return (
    <tr key={car._id}>
      <td>
        <span>{index + 1}</span>
      </td>
      <td>
        <span>{car.name}</span>
      </td>
      <td>
        <div className="dashboard-content-avatar">
          <img src={`http://localhost:5000/${car.image}`} alt={``} />
        </div>
      </td>
      <td>
        <span>{car?.price.toLocaleString()}VND/1h</span>
      </td>
      <td>
        <span>{new Date(car.updatedAt).toLocaleString()}</span>
      </td>
      <td>
        <span>
          {automakers?.map((automaker: IAutoMaker) =>
            automaker._id === car.autoMarket ? automaker.name_automaker : ""
          )}
        </span>
      </td>
      <td>
        <span>{car.user.firstname + " " + car.user.lastname}</span>
      </td>
      <td>
        <span
          className={`${
            car.user.role === "admin" ? "color-red" : "color-blue"
          }`}
        >
          {car.user.role === "admin" ? "admin" : "owner"}
        </span>
      </td>
      <td>
        <ExpiredCar car={car} />
      </td>
      <td>
        <EditCar car={car} />
      </td>
      <td>
        <DeleteCar car={car} />
      </td>
    </tr>
  );
};

export default ItemCar;
