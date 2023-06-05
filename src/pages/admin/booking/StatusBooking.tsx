import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { InputLabel, TableHead, TableRow } from "@mui/material";
import {
  updateBookingApprove,
  updateBookingCar,
} from "../../../redux/action/bookAction";
import { IBooking, UpdateStatus } from "../../../interfaces/interface";
import { useAppDispatch } from "../../../redux/hook/hook";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { closeUpdateStatus } from "../../../redux/reducer/bookingSlice";
interface Iprops {
  booking: IBooking;
}
const StatusBooking: React.FC<Iprops> = (props) => {
  const { booking } = props;
  const dispatch = useAppDispatch();
  const statusSuccess = useSelector(
    (state: RootState) => state.booking.statusSuccess
  );
  const idBookingApprove = useSelector(
    (state: RootState) => state.booking.idBookingApprove
  );
  const [isApproved, setIsApproved] = React.useState(booking.approve);
  const handleClose = () => {
    dispatch(closeUpdateStatus());
  };
  const handleChangeStatus = () => {
    dispatch(
      updateBookingApprove({
        _id: idBookingApprove,
        approve: 1,
      })
    );
    dispatch(closeUpdateStatus());
  };
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateStatus>({});

  const handleChange = (event) => {
    setIsApproved(event.target.value);
    dispatch(
      updateBookingCar({
        _id: booking._id,
        approve: event.target.value,
      })
    );
  };
  return (
    <>
      <Modal
        open={statusSuccess}
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
            width: { sm: 400, xs: 340 },
            p: "24px",
            borderRadius: "4px",
            bgcolor: "#ffffff",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <AddTaskIcon sx={{ color: "#fb483a", fontSize: "80px" }} />
            <Typography
              variant="h4"
              sx={{
                fontSize: "21px",
                fontWeight: "bold",
                marginTop: "20px",
              }}
              gutterBottom
            >
              Bạn có muốn chắc chắn cập nhật trạng thái Approve không?
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "16px" }}>
              Thời gian này đã có người đặt!
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: " 20px",
            }}
          >
            <Button
              onClick={handleClose}
              sx={{
                margin: "0 15px",
                backgroundColor: "#Fffff0",
                color: "#000",
                textTransform: "Capitalize",
              }}
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleChangeStatus}
              sx={{ margin: "0 15px", textTransform: "Capitalize" }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Active"
            onChange={handleChange}
            style={{
              width: "110px",
              textAlign: "left",
              height: "40px",
              background: `${
                booking.approve === 0
                  ? "rgb(218 224 27)"
                  : booking.approve === 1
                  ? "#163bde"
                  : booking.approve === 2
                  ? "#27ae60"
                  : "#d32f2f"
              }`,
            }}
            value={isApproved}
          >
            <MenuItem value={0}>Waiting</MenuItem>
            <MenuItem value={1}>Approve</MenuItem>
            <MenuItem value={2}>Success</MenuItem>
            <MenuItem value={3}>Reject</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default StatusBooking;
