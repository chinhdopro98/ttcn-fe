import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../redux/hook/hook";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { getListBooking } from "../redux/action/bookAction";
import { RootState } from "../redux/store/store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const ListBookings = () => {
  const dispatch = useAppDispatch();
  const bookings = useSelector(
    (state: RootState) => state.booking.listBookings
  );
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  useEffect(() => {
    dispatch(getListBooking());
  }, []);
  return (
    <Box sx={{ backgroundColor: "#7cd8d6" }}>
      <Typography
        variant="h4"
        mb={1}
        sx={{ fontSize: "25px", textAlign: "left" }}
      >
        My Booking
      </Typography>
      {bookings
        .filter((book) => book.userid === user._id)
        .map((booking, index) => {
          return (
            <>
              <Box
                sx={{
                  display: "flex",
                  padding: "10px",
                  background: "#ECE2E2",
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                }}
                mb={4}
              >
                <Box sx={{ marginRight: "30px" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#5E17EB",
                      fontSize: "45px",
                      textAlign: "center",
                      lineHeight: "120px",
                    }}
                  >
                    {index + 1}
                  </Typography>
                </Box>
                <Box
                  sx={{ width: "150px", height: "120px", marginRight: "30px" }}
                >
                  <Link to={`/app/booking/${booking.carid._id}`}>
                    <img
                      src={require(`../assets/image/car/${booking.carid?.image}`)}
                      alt=""
                      className="carimg w-full h-full"
                    />
                  </Link>
                </Box>
                <Box sx={{ textAlign: "left", display: "flex" }}>
                  <Box sx={{ width: "250px" }}>
                    <Typography
                      variant="h5"
                      mb={0.5}
                      sx={{ fontSize: "17px", textAlign: "left" }}
                    >
                      Name: {booking.carid?.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      mb={0.5}
                      sx={{ fontSize: "16px", textAlign: "left" }}
                    >
                      Price : {booking.carid?.price.toLocaleString()} vnd/1h
                    </Typography>
                    <Typography
                      variant="h6"
                      mb={0.5}
                      sx={{ fontSize: "16px", textAlign: "left" }}
                    >
                      Total hours :{booking.totalHours}h
                    </Typography>
                    <Typography
                      variant="h6"
                      mb={0.5}
                      sx={{ fontSize: "16px", textAlign: "left" }}
                    >
                      Total amount : {booking.totalMoney.toLocaleString()}vnd
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ fontSize: "16px", textAlign: "left" }}
                    >
                      {" "}
                      Status payment :
                      {booking.statusPayment === 0 ? (
                        <Box
                          sx={{
                            background: "red",
                            display: "inline-block",
                            padding: "4px",
                            borderRadius: "4px",
                          }}
                        >
                          Not
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            background: "#58CE81",
                            display: "inline-block",
                            padding: "4px",
                            borderRadius: "4px",
                          }}
                        >
                          Yes
                        </Box>
                      )}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      mb={0.5}
                      sx={{ fontSize: "16px", textAlign: "left" }}
                    >
                      Transaction ID: {booking?.transactionId}
                    </Typography>
                    <Typography
                      variant="h6"
                      mb={0.5}
                      sx={{ fontSize: "16px", textAlign: "left" }}
                    >
                      Start time:{" "}
                      {moment(booking.bookedTimeSlots.from).format(
                        "DD-MM-YYYY HH:mm"
                      )}
                    </Typography>
                    <Typography
                      variant="h6"
                      mb={0.5}
                      sx={{ fontSize: "16px", textAlign: "left" }}
                    >
                      End time:{" "}
                      {moment(booking.bookedTimeSlots.to).format(
                        "DD-MM-YYYY HH:mm"
                      )}{" "}
                    </Typography>

                    <Typography
                      variant="h5"
                      sx={{ fontSize: "16px", textAlign: "left" }}
                    >
                      {" "}
                      Status Booking :
                      {booking.approve === 0 ? (
                        <Box
                          sx={{
                            background: "red",
                            display: "inline-block",
                            padding: "4px",
                            borderRadius: "4px",
                          }}
                        >
                          Waiting
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            background: "#58CE81",
                            display: "inline-block",
                            padding: "4px",
                            borderRadius: "4px",
                          }}
                        >
                          Success
                        </Box>
                      )}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>
          );
        })}
    </Box>
  );
};

export default ListBookings;
