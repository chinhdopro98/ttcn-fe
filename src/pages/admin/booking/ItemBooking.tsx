import React, { useEffect } from "react";
import { IBooking } from "../../../interfaces/interface";
import { useAppDispatch } from "../../../redux/hook/hook";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { getAllAutoMaker } from "../../../redux/action/autoMakerAction";
import moment from "moment";
import StatusBooking from "./StatusBooking";
import { Box, Typography } from "@mui/material";
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
        {booking.statusPayment === 0 ? (
          <Box
            sx={{
              width: "40px",
              background: "#eb1e1e",
              display: "inline-block",
              padding: "4px",
              borderRadius: "4px",
              textAlign: "center",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            NO
          </Box>
        ) : (
          <Box
            sx={{
              width: "40px",
              background: "#21d7ad",
              display: "inline-block",
              padding: "4px",
              borderRadius: "4px",
              textAlign: "center",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            YES
          </Box>
        )}
      </td>
      <td>
        <StatusBooking booking={booking} />
      </td>
      <td>
        <EditBooking booking={booking} role={user.role} />
      </td>
      <td>
        <DeleteBooking booking={booking} role={user.role} />
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
