import React, { useEffect } from "react";
import { IBooking } from "../../../interfaces/interface";
import { useAppDispatch } from "../../../redux/hook/hook";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { getAllAutoMaker } from "../../../redux/action/autoMakerAction";
import moment from "moment";
import StatusBooking from "./StatusBooking";
import EditBooking from "../../../components/component/booking/EditBooking";
import DeleteBooking from "../../../components/component/booking/DeleteBooking";
interface Iprops {
  booking: IBooking;
  index: number;
}
const ItemBooking: React.FC<Iprops> = (props) => {
  const { booking, index } = props;
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
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
      <td>
        <span>{booking.carid.name}</span>
      </td>
      <td>
        <div className="dashboard-content-avatar">
          <img src={`http://localhost:5000/${booking.carid.image}`} alt={``} />
        </div>
      </td>
      <td>
        <span>
          {moment(booking.bookedTimeSlots.from).format("DD-MM-YYYY HH:mm")}
        </span>
      </td>
      <td>
        <span>
          {moment(booking.bookedTimeSlots.to).format("DD-MM-YYYY HH:mm")}
        </span>
      </td>
      <td>
        <span>{new Date(booking.createdAt).toLocaleString()}</span>
      </td>
      <td>
        <span>
          {booking.userid?.firstname + " " + booking.userid?.lastname}
        </span>
      </td>
      <td>
        <span>{booking.totalMoney.toLocaleString()}VND</span>
      </td>
      <td>
        <StatusBooking booking={booking} />
      </td>
      <td>
        <EditBooking booking={booking} role={user.role} />
      </td>
      <td>
        <DeleteBooking booking={booking} />
      </td>
      {/* <td>
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
        <DeleteCar car={car} />
      </td> */}
    </tr>
  );
};

export default ItemBooking;
