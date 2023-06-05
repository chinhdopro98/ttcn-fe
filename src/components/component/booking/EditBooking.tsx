import { Button, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useAppDispatch } from "../../../redux/hook/hook";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { IBooking, UpdateBooking } from "../../../interfaces/interface";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import moment from "moment";
import Radio from "@mui/material/Radio";
import dayjs from "dayjs";
import { updateBooking } from "../../../redux/action/bookAction";
interface Iprops {
  booking: IBooking;
  role: string;
}
const EditBooking: React.FC<Iprops> = (props) => {
  const { booking, role } = props;

  const [driver, setDriver] = useState(booking.driverRequired);
  const handleChangeDriver = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDriver((event.target as HTMLInputElement).value);
  };
  const [startTime, setStartTime] = useState(booking.bookedTimeSlots.from);
  const [endTime, setEndTime] = useState(booking.bookedTimeSlots.to);
  const [totalHours, setTotalHours] = useState(booking.totalHours);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [totalMoney, setTotalMoney] = useState(booking.totalMoney);
  const calculateHours = async (values: any) => {
    await setTotalHours(dayjs(endTime).diff(dayjs(startTime), "hours"));
  };

  useEffect(() => {
    setTotalHours(dayjs(endTime).diff(dayjs(startTime), "hours"));
    setTotalMoney(totalHours * booking.carid?.price);
    if (driver !== "no") {
      setTotalMoney(totalMoney + 50000 * totalHours);
    }
  }, [driver, totalHours, startTime, endTime]);
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateBooking>({});
  const handleClose = () => {
    setOpen(false);
    reset({
      from: booking.bookedTimeSlots.from,
      to: booking.bookedTimeSlots.to,
    });
    setDriver(booking.driverRequired);
    setTotalHours(booking.totalHours);
    setTotalMoney(booking.totalMoney);
  };
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await dispatch(
      updateBooking({
        _id: booking._id,
        bookedTimeSlots: {
          from: startTime,
          to: endTime,
        },
        approve: booking.approve,
        driverRequired: driver,
        totalHours: totalHours,
        totalMoney: totalMoney,
      })
    );
    setOpen(false);
    // handleClose();
  };
  useEffect(() => {
    reset({
      from: booking.bookedTimeSlots.from,
      to: booking.bookedTimeSlots.to,
    });
    setDriver(booking.driverRequired);
  }, [booking]);

  return (
    <div>
      <Button onClick={handleOpen}>
        <i className="fa-solid fa-pen-to-square"></i>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { sm: 600, xs: "90%" },
            p: "24px",
            borderRadius: "4px",
            bgcolor: "#ffffff",
          }}
        >
          <Typography
            variant="h5"
            sx={{ marginBottom: "20px" }}
            fontSize={"20px"}
            lineHeight={"26px"}
          >
            Chỉnh sửa đặt xe: {booking.carid.name}
          </Typography>
          <Box
            sx={{
              width: "300px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
              padding: "10px 20px",
              marginBottom: "25px",
              background: "#e6e47b",
            }}
          >
            <Typography
              variant="h5"
              sx={{ marginBottom: "10px" }}
              fontSize={"20px"}
              lineHeight={"26px"}
            >
              Người đặt xe:{" "}
              {booking.userid?.firstname + " " + booking.userid?.lastname}
            </Typography>
            <Typography
              variant="h6"
              sx={{ marginBottom: "10px" }}
              fontSize={"20px"}
              lineHeight={"26px"}
            >
              Số điện thoai: {booking.userid?.phone}
            </Typography>
            <Typography variant="h6" fontSize={"20px"} lineHeight={"26px"}>
              Email: {booking.userid?.email}
            </Typography>
          </Box>
          <form autoComplete="off">
            <Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between" }}
                mb={1}
              >
                <Controller
                  control={control}
                  name="from"
                  render={({ field: { onChange, value } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDateTimePicker
                        label="Start Time"
                        inputFormat="YYYY-MM-DDTHH:mm"
                        value={startTime}
                        onChange={async (date) => {
                          setStartTime(dayjs(date).format("MMM DD YYYY HH:mm"));
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  )}
                />
                <Controller
                  control={control}
                  name="to"
                  render={({ field: { onChange, value } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDateTimePicker
                        label="End Time"
                        inputFormat="YYYY-MM-DDTHH:mm"
                        value={endTime}
                        onChange={(date) => {
                          setEndTime(dayjs(date).format("MMM DD YYYY HH:mm"));
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControl sx={{ display: "flex" }}>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    <Typography variant="h5" sx={{}} mb={1}>
                      Có lái:
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
                      label="Không"
                    />
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Có"
                    />
                  </RadioGroup>
                </FormControl>
                {/* <Button
                  type="button"
                  onClick={calculateHours}
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    color: "#000000",
                    height: "45px",
                  }}
                >
                  Kiểm tra
                </Button> */}
              </Box>
              <Typography variant="h6" sx={{}} mb={1}>
                Tổng giờ: {totalHours} h
              </Typography>
              <Typography variant="h6" sx={{}} mb={1}>
                Tổng tiền: {totalMoney?.toLocaleString()} VND
              </Typography>
            </Box>
            <Box sx={{ float: "right" }}>
              <Button
                type="button"
                onClick={handleClose}
                variant="contained"
                sx={{
                  backgroundColor: "#FFFFFF",
                  textTransform: "capitalize",
                  color: "#000000",
                }}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={onSubmit}
                disabled={role === "user" && booking.approve !== 0}
                sx={{
                  backgroundColor: "#f24b50",
                  textTransform: "capitalize",
                  margin: "0 5px",
                }}
              >
                Lưu
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditBooking;
