import { createSlice } from "@reduxjs/toolkit";
import { IBooking } from "../../interfaces/interface";
import {
  bookingCar,
  createBookingCar,
  deleteBooking,
  getAllBookingOwner,
  getListBooking,
  updateBooking,
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
    });
    builder.addCase(getListBooking.rejected, (state, { payload }) => {
      state.success = false;
    });

    builder.addCase(getAllBookingOwner.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllBookingOwner.fulfilled, (state, { payload }) => {
      state.success = false;
      state.listBookings = payload;
    });

    builder.addCase(updateBooking.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateBooking.fulfilled, (state, { payload }) => {
      if (payload.status === "success") {
        state.error = "";
        state.labelSuccess = "Cập nhật xe thành công!";
        state.openSnackbar = true;
        state.listBookings = state.listBookings.map((booking) => {
          if (booking._id === payload.booking._id) {
            return {
              _id: payload.booking._id,
              bookedTimeSlots: payload.booking.bookedTimeSlots,
              totalHours: payload.booking.totalHours,
              totalMoney: payload.booking.totalMoney,
              driverRequired: payload.booking.driverRequired,
              userid: payload.booking.userid,
              carid: payload.booking.carid,
              createdAt: payload.booking.createdAt,
              statusPayment: payload.booking.statusPayment,
            };
          }
          return booking;
        });
      }
      // state.listBookings = payload;
    });
    builder.addCase(updateBooking.rejected, (state, action) => {
      state.loading = true;
    });

    builder.addCase(updateBookingCar.fulfilled, (state, { payload }) => {
      if (payload.data.status === "success") {
        state.listBookings = state.listBookings.map((booking: IBooking) => {
          if (booking._id === payload.data.id) {
            booking.approve = payload.data.approve;
          }
          return booking;
        });
        state.error = "";
        state.labelSuccess = `${
          payload.data.approve === 1
            ? "Approve booking success"
            : "UnApprove booking success"
        }`;
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
    builder.addCase(deleteBooking.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        state.error = "";
        state.labelSuccess = "Xóa đặt xe thành công";
        state.openSnackbar = true;
        state.listBookings = state.listBookings.filter((booking) => {
          if (booking._id !== action.payload.id) return booking;
        });
      }
    });
  },
});
export const { closeSnackBar } = bookingSlice.actions;
export default bookingSlice.reducer;
