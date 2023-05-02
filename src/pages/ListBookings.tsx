import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../redux/hook/hook";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { getListBooking } from "../redux/action/bookAction";
import { RootState } from "../redux/store/store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Back from "./common/Back";
import img from "../assets/image/car/bg-list.jpg";
import EditBooking from "../components/component/booking/EditBooking";
import DeleteBooking from "../components/component/booking/DeleteBooking";
const ListBookings = () => {
  const dispatch = useAppDispatch();
  const bookings = useSelector(
    (state: RootState) => state.booking.listBookings
  );
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getListBooking());
  }, []);
  return (
    <>
      <Back
        name="Book Now"
        title="Đặt xe & chinh phục những cung đường"
        cover={img}
      />
      <Box sx={{ padding: "40px 30px" }}>
        <Typography
          variant="h3"
          mb={1}
          sx={{
            fontSize: "26px",
            fontWeight: "bold",
            textAlign: "center",
            padding: "0 0 40px 0",
          }}
        >
          DANH SÁCH ĐẶT XE
        </Typography>
        <table>
          <thead>
            <th>ID</th>
            <th>Tên</th>
            <th>Ảnh</th>
            <th>Bắt đầu</th>
            <th>Kết thúc</th>
            <th>Ngày tạo</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            <th>Edit</th>
            <th>Delete</th>
          </thead>
          {bookings
            .filter((book) => book.userid._id === user._id)
            .map((booking, index) => {
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
                      <img
                        src={`http://localhost:5000/${booking.carid.image}`}
                        alt={``}
                      />
                    </div>
                  </td>
                  <td>
                    <span>
                      {moment(booking.bookedTimeSlots.from).format(
                        "DD-MM-YYYY HH:mm"
                      )}
                    </span>
                  </td>
                  <td>
                    <span>
                      {moment(booking.bookedTimeSlots.to).format(
                        "DD-MM-YYYY HH:mm"
                      )}
                    </span>
                  </td>
                  <td>
                    <span>{new Date(booking.createdAt).toLocaleString()}</span>
                  </td>

                  <td>
                    <span>{booking.totalMoney.toLocaleString()}VND</span>
                  </td>
                  <td>
                    {booking.approve === 0 ? (
                      <Box
                        sx={{
                          width: "80px",
                          background: "#ffe000",
                          display: "inline-block",
                          padding: "6px",
                          borderRadius: "4px",
                          textAlign: "center",
                        }}
                      >
                        Waiting
                      </Box>
                    ) : booking.approve === 1 ? (
                      <Box
                        sx={{
                          width: "80px",
                          background: "#58CE81",
                          display: "inline-block",
                          textAlign: "center",
                          padding: "6px",
                          borderRadius: "4px",
                        }}
                      >
                        Success
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: "80px",
                          background: "#f00017",
                          display: "inline-block",
                          padding: "6px",
                          borderRadius: "4px",
                          textAlign: "center",
                        }}
                      >
                        Reject
                      </Box>
                    )}
                  </td>
                  <td>
                    <EditBooking booking={booking} role={user.role} />
                  </td>
                  <td>
                    <DeleteBooking booking={booking} />
                  </td>
                </tr>
              );
            })}
        </table>
      </Box>
    </>
  );
};

export default ListBookings;
