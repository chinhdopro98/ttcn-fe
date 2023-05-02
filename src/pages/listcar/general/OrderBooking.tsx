import React, { useEffect } from "react";
import { IAutoMaker, IBooking } from "../../../interfaces/interface";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { useAppDispatch } from "../../../redux/hook/hook";
import { getAllAutoMaker } from "../../../redux/action/autoMakerAction";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import EditBooking from "../../../components/component/booking/EditBooking";
import DeleteBooking from "../../../components/component/booking/DeleteBooking";
import StatusBooking from "../../admin/booking/StatusBooking";
interface Iprops {
  booking: IBooking[];
}

const OrderBooking: React.FC<Iprops> = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { booking } = props;
  const dispatch = useAppDispatch();
  const automakers = useSelector(
    (state: RootState) => state.automaker.automakers
  );
  useEffect(() => {
    dispatch(getAllAutoMaker());
  }, [dispatch]);
  return (
    <>
      {booking.length !== 0
        ? booking.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>
                  <span>{index + 1}</span>
                </td>
                <td>
                  <span>{item.carid.name}</span>
                </td>
                <td>
                  <div className="dashboard-content-avatar">
                    <img
                      src={`http://localhost:5000/${item.carid.image}`}
                      alt={``}
                    />
                  </div>
                </td>
                <td>
                  <span>
                    {moment(item.bookedTimeSlots.from).format(
                      "DD-MM-YYYY HH:mm"
                    )}
                  </span>
                </td>
                <td>
                  <span>
                    {moment(item.bookedTimeSlots.to).format("DD-MM-YYYY HH:mm")}
                  </span>
                </td>
                <td>
                  <span>{new Date(item.createdAt).toLocaleString()}</span>
                </td>

                <td>
                  <span>{item.totalMoney.toLocaleString()}VND</span>
                </td>
                <td>
                  <span>
                    {item.userid?.firstname + " " + item.userid?.lastname}
                  </span>
                </td>
                <td>
                  <StatusBooking booking={item} />
                </td>
                <td>
                  <EditBooking booking={item} role={user.role} />
                </td>
              </tr>
            );
          })
        : null}
    </>
  );
};

export default OrderBooking;
