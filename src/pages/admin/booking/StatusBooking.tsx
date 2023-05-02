import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { InputLabel, TableHead, TableRow } from "@mui/material";
import { updateBookingCar } from "../../../redux/action/bookAction";
import { IBooking, UpdateStatus } from "../../../interfaces/interface";
import { useAppDispatch } from "../../../redux/hook/hook";
import Checkbox from "@mui/material/Checkbox";
interface Iprops {
  booking: IBooking;
}
const StatusBooking: React.FC<Iprops> = (props) => {
  const { booking } = props;
  const dispatch = useAppDispatch();
  const [isApproved, setIsApproved] = React.useState(booking.approve);
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateStatus>({});

  // useEffect(() => {
  //   reset({
  //     approve: isApproved,
  //   });
  // }, [booking.approve, reset, isApproved]);
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
                ? "#27ae60"
                : "#d32f2f"
            }`,
          }}
          value={isApproved}
        >
          <MenuItem value={0}>Waiting</MenuItem>
          <MenuItem value={1}>Success</MenuItem>
          <MenuItem value={2}>Reject</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default StatusBooking;
