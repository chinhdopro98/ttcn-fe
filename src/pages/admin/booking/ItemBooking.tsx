import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { InputLabel, TableHead, TableRow } from "@mui/material";
import {
  IBooking,
  IBookingStore,
  UpdateStatus,
} from "../../../interfaces/interface";
import { useAppDispatch } from "../../../redux/hook/hook";
import { updateBookingCar } from "../../../redux/action/bookAction";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
interface Iprops {
  booking: IBookingStore;
}
const ItemBooking: React.FC<Iprops> = (props) => {
  const { booking } = props;
  const dispatch = useAppDispatch();
  const [m, setM] = React.useState(booking.approve);
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateStatus>({});
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Controller
        name="status"
        render={({ field }) => (
          <>
            <FormControl fullWidth>
              <Select
                labelId="select-label"
                label="Choose a province..."
                {...field}
                sx={{
                  height: "45px",
                  fontSize: "13px",
                  width: "100px",
                  marginBottom: "25px",
                  background: "#eab676",
                }}
                MenuProps={MenuProps}
                onChange={(e: any) => {
                  dispatch(
                    updateBookingCar({
                      _id: booking._id,
                      status: e.target.value,
                    })
                  );
                }}
                value={m}
              >
                <MenuItem value={0} key={0}>
                  Cancel
                </MenuItem>
                <MenuItem value={1} key={1}>
                  Done
                </MenuItem>
              </Select>
            </FormControl>
          </>
        )}
        control={control}
        defaultValue={0}
      ></Controller>
    </Box>
  );
};

export default ItemBooking;
