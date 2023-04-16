import { createSlice } from "@reduxjs/toolkit";
import { IBooking } from "../../interfaces/interface";
import {
  bookingCar,
  createBookingCar,
  getListBooking,
  updateBookingCar,
} from "../action/bookAction";

interface BookingState {
  loading: boolean;
  error: string;
  success: boolean;
  bookings: IBooking[];
  listBookings: any[];
  openSnackbar: boolean;
  labelSuccess: string;
}
const initialState: BookingState = {
  loading: false,
  error: "",
  success: false,
  bookings: [],
  listBookings: [],
  labelSuccess: "",
  openSnackbar: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    closeSnackBar: (state) => {
      state.openSnackbar = false;
    },
  },
  extraReducers: (builder) => {
    //booking car
    builder.addCase(bookingCar.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(bookingCar.fulfilled, (state, { payload }) => {
      state.success = false;
    });

    builder.addCase(getListBooking.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getListBooking.fulfilled, (state, { payload }) => {
      state.success = false;
      state.listBookings = payload;
      console.log(payload);
    });
    builder.addCase(getListBooking.rejected, (state, { payload }) => {
      state.success = false;
    });

    builder.addCase(updateBookingCar.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.error = "";
        state.labelSuccess = action.payload.data;
        console.log(action);
        state.openSnackbar = true;
        state.bookings = state.bookings.map((booking: any) => {
          if (booking._id === action.meta.arg._id) {
            booking.approve = action.meta.arg.status;
          }
          return booking;
        });
      } else {
        state.labelSuccess = "";
        state.error = "update status";
        state.openSnackbar = true;
      }
    });

    builder.addCase(createBookingCar.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.error = "";
        state.labelSuccess = action.payload.data;
        state.openSnackbar = true;
      } else {
        state.labelSuccess = "";
        state.error = "You booking failed";
        state.openSnackbar = true;
      }
    });
  },
});
export const { closeSnackBar } = bookingSlice.actions;
export default bookingSlice.reducer;
