import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCar, getCarOne } from "../redux/action/carAction";
import { useAppDispatch } from "../redux/hook/hook";
import { DatePicker } from "antd";
import { RootState } from "../redux/store/store";
import Box from "@mui/material/Box";
import { IAutoMaker, IBooking, Icar } from "../interfaces/interface";
import Radio from "@mui/material/Radio";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import { bookingCar, createBookingCar } from "../redux/action/bookAction";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import StripeCheckout from "react-stripe-checkout";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllAutoMaker } from "../redux/action/autoMakerAction";
import { closeSnackBar } from "../redux/reducer/bookingSlice";
import car from "../assets/image/car/bg-book1.jpg";
import styled from "styled-components";
import Back from "./common/Back";
import img from "../assets/image/car/bg-booking2.jpg";
const style = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
const HomeLogin = styled.div`
  width: 100%;
`;
const Booking = () => {
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const { RangePicker } = DatePicker;
  const paramId = useParams();
  const dispatch = useAppDispatch();
  const car = useSelector((state: RootState) => state.car.car);
  const automakers = useSelector(
    (state: RootState) => state.automaker.automakers
  );
  useEffect(() => {
    dispatch(getCarOne(paramId.carid));
    dispatch(getAllAutoMaker());
  }, [dispatch]);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState("no");
  const [totalMoney, setTotalMoney] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOpenModal(false);
  };
  const labelSuccess = useSelector(
    (state: RootState) => state.booking.labelSuccess
  );
  const labelError = useSelector((state: RootState) => state.booking.error);
  const openSnackbar = useSelector(
    (state: RootState) => state.booking.openSnackbar
  );
  const handleCloseSnackBar = () => {
    dispatch(closeSnackBar());
  };
  const handleChangeDriver = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDriver((event.target as HTMLInputElement).value);
  };
  const calculateHours = async (values: any) => {
    await setStartTime(dayjs(values[0]).format("MMM DD YYYY HH:mm"));
    await setEndTime(dayjs(values[1]).format("MMM DD YYYY HH:mm"));
    await setTotalHours(values[1].diff(values[0], "hours"));
  };
  useEffect(() => {
    if (car?.price) {
      setTotalMoney(totalHours * car.price);
    }
    if (driver !== "no") {
      setTotalMoney(totalMoney + 50000 * totalHours);
    }
  }, [driver, totalHours]);
  const submitBooking = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (startTime === "" && endTime === "") {
      setOpenModal(true);
    } else {
      const objectBook: IBooking = {
        userid: user._id,
        carid: car?._id,
        totalHours: totalHours,
        totalMoney: totalMoney,
        driverRequired: driver,
        bookedTimeSlots: {
          from: startTime,
          to: endTime,
        },
        statusPayment: 1,
        approve: 0,
      };
      await dispatch(createBookingCar(objectBook));
      setStartTime("");
      setEndTime("");
    }
  };
  async function onToken(token) {
    if (startTime === "" && endTime === "") {
      setOpenModal(true);
    } else {
      const objectBook: IBooking = {
        userid: user._id,
        carid: car?._id,
        totalHours: totalHours,
        totalMoney: totalMoney,
        driverRequired: driver,
        bookedTimeSlots: {
          from: startTime,
          to: endTime,
        },
      };
      await dispatch(bookingCar(objectBook));
    }
  }
  if (!car) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Back
        name="Book Now"
        title="Đặt xe & chinh phục những cung đường"
        cover={img}
      />
      <HomeLogin className="home-form" style={styles.bg_img}>
        <Box sx={{ backgroundImage: `url(../assets/image/car/pg-admin.jpg)` }}>
          <Box
            sx={{
              display: "flex",
              paddingBottom: "50px",
              padding: "20px 20px 50px 20px",
            }}
          >
            <Box>
              <div className="h-64">
                <Typography variant="h3" sx={{ fontWeight: "bold" }} mb={1}>
                  {car?.name}
                </Typography>
                <Box>
                  {car?.image ? (
                    <img
                      src={`http://localhost:5000/${car.image}`}
                      alt=""
                      className="carimg w-full h-full"
                    />
                  ) : (
                    ""
                  )}
                </Box>
              </div>
              <Typography variant="h5" mb={1}>
                {car?.capacity === 1 ? "Petrol" : ""}
              </Typography>
            </Box>
            <Box sx={{ width: "60%", paddingLeft: "25px" }}>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableRow>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">{car?.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Capacity</TableCell>
                    <TableCell align="left">{car?.capacity}(lit)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Auto Maker</TableCell>
                    <TableCell align="left">
                      {automakers?.map((automaker: IAutoMaker) =>
                        automaker._id === car.autoMarket
                          ? automaker.name_automaker
                          : ""
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Fuel Type</TableCell>
                    <TableCell align="left">
                      {car?.capacity === 1
                        ? "Petrol"
                        : car?.capacity === 2
                        ? "Oil"
                        : "Electricity"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Create Year</TableCell>
                    <TableCell align="left">{car?.yearCreated}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="left" sx={{ width: 180 }}>
                      Country Origin
                    </TableCell>
                    <TableCell align="left">{car?.origin}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Number Seats</TableCell>
                    <TableCell align="left">{car?.numbereatSeats}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">
                      {car?.status === 1 ? "New" : "Old"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Color OutSide</TableCell>
                    <TableCell align="left">{car?.colorOutSide}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Color InSide</TableCell>
                    <TableCell align="left">{car?.colorInSide}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Door Number</TableCell>
                    <TableCell align="left">{car?.doorNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Consume Fuel</TableCell>
                    <TableCell align="left">{car?.consumeFuel}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Gear Number</TableCell>
                    <TableCell align="left">{car?.gear}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Notes</TableCell>
                    <TableCell align="left">{car?.note}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">
                      {car?.price.toLocaleString()}VND/1h
                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                width: "400px",
                textAlign: "left",
                display: "block",
                margin: "0 auto",
              }}
            >
              <form action="">
                <Box sx={{ display: "block" }}>
                  <RangePicker
                    showTime={{ format: "HH:mm" }}
                    format="MM/DD/YYYY HH:mm A"
                    onChange={calculateHours}
                  />
                  {/* <Button
                    variant="contained"
                    onClick={handleOpen}
                    sx={{
                      display: "block",
                      margin: "20px 0",
                      textAlign: "center",
                    }}
                  >
                    See book slots
                  </Button> */}
                </Box>
                <Grid item sm={4} xs={6} md={3}>
                  <FormControl sx={{ display: "flex" }}>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      <Typography variant="h5" sx={{}} mb={1}>
                        DRIVER
                      </Typography>
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={driver}
                      onChange={handleChangeDriver}
                    >
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </form>
              <Typography variant="h6" sx={{}} mb={1}>
                Total Hours: {totalHours} h
              </Typography>
              <Typography variant="h6" sx={{}} mb={1}>
                Total Money: {totalMoney?.toLocaleString()} VND
              </Typography>
              {user.role !== "user" ? null : (
                <Box sx={{ display: "flex", paddingBottom: "40px" }}>
                  <StripeCheckout
                    token={onToken}
                    stripeKey="pk_test_51MLq0vDswle805HzRg29Zx4VUNm49azYkiOdnC6cZmd2manYdeqnWaiCFsmyJdrTnpK3lC6H18wRehD2HW7qXf3a00gLz9F2em"
                    name="Tesla Roadster"
                    amount={totalMoney}
                    currency="inr"
                    shippingAddress
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={submitBooking}
                    sx={{
                      margin: "0 10px",
                      textTransform: "capitalize",
                    }}
                  >
                    Booking now
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Booking Times
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {car && (
                <div>
                  {car.bookedTimeSlots.map((slot) => {
                    return (
                      <p>
                        Time: {slot.from} - {slot.to}
                      </p>
                    );
                  })}
                  <Button
                    variant="contained"
                    sx={{ float: "right" }}
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </div>
              )}
            </Typography>
          </Box>
        </Modal>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: "#Be2545", textAlign: "center" }}
            >
              WARRRING BOOKING!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              You not choose time booking!
            </Typography>
            <Button
              variant="contained"
              sx={{ float: "right" }}
              onClick={handleClose}
            >
              Close
            </Button>
          </Box>
        </Modal>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={openSnackbar}
          autoHideDuration={1000}
          onClose={handleCloseSnackBar}
        >
          <Box>
            {labelSuccess && (
              <MuiAlert
                onClose={handleCloseSnackBar}
                variant="filled"
                severity="success"
              >
                {labelSuccess}
              </MuiAlert>
            )}
            {labelError && (
              <MuiAlert
                onClose={handleCloseSnackBar}
                variant="filled"
                severity="error"
              >
                {labelError}
              </MuiAlert>
            )}
          </Box>
        </Snackbar>
      </HomeLogin>
    </>
  );
};
const styles = {
  bg_img: {
    backgroundImage: "url(" + car + ")",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
} as const;
export default Booking;
