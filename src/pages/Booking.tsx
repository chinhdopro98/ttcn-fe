import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCarOne } from "../redux/action/carAction";
import { useAppDispatch } from "../redux/hook/hook";
import { DatePicker } from "antd";
import { RootState } from "../redux/store/store";
import Box from "@mui/material/Box";
import { IAutoMaker, IBooking } from "../interfaces/interface";
import Radio from "@mui/material/Radio";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import dayjs from "dayjs";
import { createBookingCar } from "../redux/action/bookAction";
import { Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { getAllAutoMaker } from "../redux/action/autoMakerAction";
import { closeSnackBar } from "../redux/reducer/bookingSlice";
import car from "../assets/image/car/bg-book1.jpg";
import styled from "styled-components";
import Back from "./common/Back";
import img from "../assets/image/car/bg-booking2.jpg";
import { createCheckoutSessionApi } from "../api/bookingApi";

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
  const user = JSON.parse(localStorage.getItem("user") || "null");
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
  }, [dispatch, paramId.carid]);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState("no");
  const [text, setText] = useState("");
  const [totalMoney, setTotalMoney] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

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

  const calculateHours = (values: any) => {
    if (!values || values.length !== 2) {
      setStartTime("");
      setEndTime("");
      setTotalHours(0);
      return;
    }

    setStartTime(dayjs(values[0]).format("MMM DD YYYY HH:mm"));
    setEndTime(dayjs(values[1]).format("MMM DD YYYY HH:mm"));
    setTotalHours(values[1].diff(values[0], "hours"));
  };

  useEffect(() => {
    const carPrice = car?.price || 0;
    const base = totalHours * carPrice;
    const driverFee = driver !== "no" ? 30000 * totalHours : 0;
    setTotalMoney(base + driverFee);
  }, [car?.price, driver, totalHours]);

  const buildBookingPayload = (): IBooking | null => {
    if (!user?._id || !car?._id || !startTime || !endTime || totalHours <= 0) {
      return null;
    }

    return {
      userid: user._id,
      carid: car._id,
      totalHours,
      totalMoney,
      driverRequired: driver,
      bookedTimeSlots: {
        from: startTime,
        to: endTime,
      },
      statusPayment: 1,
      approve: 0,
    };
  };

  const submitBooking = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const objectBook = buildBookingPayload();
    if (!objectBook) {
      setOpenModal(true);
      return;
    }

    await dispatch(createBookingCar(objectBook));
    setStartTime("");
    setEndTime("");
  };

  const createCheckoutSession = async () => {
    setCheckoutError("");

    const objectBook = buildBookingPayload();
    if (!objectBook) {
      setOpenModal(true);
      return;
    }

    setIsCreatingCheckout(true);

    const successUrl = `${window.location.origin}/app/payment-success`;
    const cancelUrl = `${window.location.origin}/app/booking/${paramId.carid}?checkout=cancelled`;

    const checkout = await createCheckoutSessionApi({
      ...objectBook,
      note: text,
      successUrl,
      cancelUrl,
    } as any);

    const checkoutUrl =
      checkout?.checkoutUrl || checkout?.url || checkout?.sessionUrl;

    if (!checkoutUrl) {
      setCheckoutError("Không tạo được link thanh toán. Vui lòng thử lại.");
      setIsCreatingCheckout(false);
      return;
    }

    window.open(checkoutUrl, "_blank", "noopener,noreferrer");
    setIsCreatingCheckout(false);
  };

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
                      Gara: {car?.user?.nameCustomer}
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
                    Giá thuê: {car?.price?.toLocaleString()}VND/1h
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
              <Typography variant="h6" mb={1}>
                Tổng giờ: {totalHours} h
              </Typography>
              <Typography variant="h6" mb={1}>
                Tổng tiền: {totalMoney?.toLocaleString()} VND
              </Typography>
              {checkoutError ? (
                <Typography sx={{ color: "#e74c3c", marginBottom: "8px" }}>
                  {checkoutError}
                </Typography>
              ) : null}
              {user?.role !== "user" ? null : (
                <Box sx={{ display: "flex", paddingBottom: "40px", gap: "10px" }}>
                  <Button
                    variant="contained"
                    onClick={createCheckoutSession}
                    disabled={isCreatingCheckout || !totalMoney || totalHours <= 0}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {isCreatingCheckout ? "Đang tạo link..." : "Thanh toán online"}
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={submitBooking}
                    sx={{ textTransform: "capitalize" }}
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
