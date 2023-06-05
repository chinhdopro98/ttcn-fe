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
  const [text, setText] = useState("");
  const [totalMoney, setTotalMoney] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleNoteChange = (event) => {
    setText(event.target.value);
  };
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
      setTotalMoney(totalMoney + 30000 * totalHours);
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
        token: token,
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
              display: "block",
              paddingBottom: "50px",
              padding: "40px 20px 30px 20px",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box sx={{ width: "450px", height: "380px" }}>
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
              <Box
                sx={{
                  paddingLeft: "25px",
                  textAlign: "left",
                  width: "calc(100% - 475px);",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    textTransform: "uppercase",
                  }}
                  mb={1.5}
                >
                  {car?.name}
                </Typography>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ width: "50%" }}>
                    <Typography variant="h6" sx={{ fontSize: "16px" }} mb={1}>
                      Dòng xe:
                      {automakers?.map((automaker: IAutoMaker) =>
                        automaker._id === car.autoMarket
                          ? automaker.name_automaker
                          : ""
                      )}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: "16px" }} mb={1}>
                      Nhiên liệu:{" "}
                      {car?.fuelType === 1
                        ? "Xăng"
                        : car?.fuelType === 2
                        ? "Dầu"
                        : "Điện"}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: "16px" }} mb={1}>
                      Năm sản xuất :{car?.yearCreated}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: "16px" }} mb={1}>
                      Dung tích:{car?.capacity}(lit)
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: "16px" }} mb={1}>
                      Tình trạng: {car?.status === 1 ? "Mới" : "Cũ"}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: "16px" }} mb={1}>
                      Gara: {car?.user.nameCustomer}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "50%" }}>
                    <Typography variant="h6" sx={{ fontSize: "16px" }} mb={1}>
                      Tiêu thụ: {car?.consumeFuel}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: "16px" }} mb={1}>
                      Số chỗ ngồi: {car?.gear}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: "16px" }} mb={1}>
                      Màu nội thất: {car?.colorInSide}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: "16px" }} mb={1}>
                      Màu ngoại thất thất: {car?.colorInSide}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: "16px" }} mb={1}>
                      Số cửa: {car?.doorNumber}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: "16px" }} mb={1}>
                      Xuất xứ: {car?.origin}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: "16px" }} mb={1}>
                    Ghi chí: {car?.note}
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "16px" }} mb={1}>
                    Địa chỉ: {car?.address}
                  </Typography>
                </Box>
                <Box>
                  {" "}
                  <Typography
                    variant="h6"
                    sx={{
                      display: "inline-block",
                      fontSize: "18px",
                      background: "#27ae60",
                      padding: "12px",
                    }}
                    mb={1}
                  >
                    {" "}
                    Giá thuê: {car?.price.toLocaleString()}VND/1h{" "}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                maxWidth: "1200px",
                textAlign: "left",
                display: "block",
                padding: "0px 20px 30px 20px",
                margin: "0 auto",
              }}
            >
              <form action="">
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ display: "block" }}>
                    <RangePicker
                      showTime={{ format: "HH:mm" }}
                      format="MM/DD/YYYY HH:mm A"
                      onChange={calculateHours}
                    />
                  </Box>
                  <FormControl
                    sx={{
                      display: "flex",
                      flexDirection: "inherit",
                      alignItems: "center",
                    }}
                  >
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      <Typography
                        variant="h5"
                        sx={{ marginLeft: "50px", marginRight: "20px" }}
                      >
                        Có lái:
                      </Typography>
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={driver}
                      onChange={handleChangeDriver}
                      sx={{ display: "inline-block" }}
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
                </Box>
                <textarea
                  cols={20}
                  rows={3}
                  className="text-booking"
                  placeholder="Ghi chú"
                  value={text}
                  onChange={handleNoteChange}
                ></textarea>
              </form>
              <Typography variant="h6" sx={{}} mb={1}>
                Tổng giờ: {totalHours} h
              </Typography>
              <Typography variant="h6" sx={{}} mb={1}>
                Tổng tiền: {totalMoney?.toLocaleString()} VND
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
          autoHideDuration={5000}
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
