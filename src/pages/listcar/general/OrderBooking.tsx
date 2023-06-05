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
import { getCarByUser } from "../../../redux/action/carAction";
import {
  getAllBookingOwner,
  getListBooking,
} from "../../../redux/action/bookAction";

const OrderBooking = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const bookingss = useSelector(
    (state: RootState) => state.booking.listBookings
  );
  const dispatch = useAppDispatch();

  return (
    <>
      {bookingss.length !== 0 && (
        <table>
          <thead>
            <th>ID</th>
            <th>Tên</th>
            <th>Ảnh</th>
            <th>Bắt đầu</th>
            <th>Kết thúc</th>
            <th>Ngày tạo</th>
            <th>Giá</th>
            <th>Khách hàng</th>
            <th>Pay</th>
            <th>Trạng thái</th>
            <th>Edit</th>
          </thead>
          <tbody>
            {bookingss.map((bookings, index) => {
              return bookings.length !== 0
                ? bookings.map((item, index) => {
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
                            {moment(item.bookedTimeSlots.to).format(
                              "DD-MM-YYYY HH:mm"
                            )}
                          </span>
                        </td>
                        <td>
                          <span>
                            {new Date(item.createdAt).toLocaleString()}
                          </span>
                        </td>
                        <td>
                          <span>{item.totalMoney.toLocaleString()}VND</span>
                        </td>
                        <td>
                          <span>
                            {item.userid?.firstname +
                              " " +
                              item.userid?.lastname}
                          </span>
                        </td>
                        <td>
                          {item.statusPayment === 0 ? (
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
                          <StatusBooking booking={item} />
                        </td>
                        <td>
                          <EditBooking booking={item} role={user.role} />
                        </td>
                      </tr>
                    );
                  })
                : null;
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderBooking;
