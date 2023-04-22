import React, { useEffect } from "react";
import { IBooking } from "../../../interfaces/interface";
import { useAppDispatch } from "../../../redux/hook/hook";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { getAllAutoMaker } from "../../../redux/action/autoMakerAction";
interface Iprops {
  booking: IBooking;
  index: number;
}
const ItemBooking: React.FC<Iprops> = (props) => {
  const { booking, index } = props;
  const dispatch = useAppDispatch();
  const automakers = useSelector(
    (state: RootState) => state.automaker.automakers
  );
  useEffect(() => {
    dispatch(getAllAutoMaker());
  }, [dispatch]);
  return (
    <tr key={booking._id}>
      <td>
        <span>{index + 1}</span>
      </td>
      {/* <td>
        <span>{booking.name}</span>
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
        <ExpiredCar car={car} />
      </td>
      <td>
        <EditCar car={car} />
      </td>
      <td>
        <DeleteCar car={car} />
      </td> */}
    </tr>
  );
};

export default ItemBooking;
