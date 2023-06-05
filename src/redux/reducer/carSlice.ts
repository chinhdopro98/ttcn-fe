import { createSlice } from "@reduxjs/toolkit";
import { AddCar, Icar, UpdateCar } from "../../interfaces/interface";
import {
  approveCar,
  createCar,
  createCarFormdata,
  deleteCar,
  editCar,
  getCar,
  getCarByUser,
  getCarOne,
  getTotalData,
  hideShowCar,
  updateCar,
} from "../action/carAction";

interface CarState {
  loading: boolean;
  error: string;
  success: boolean;
  cars: Icar[];
  openSnackbar: boolean;
  labelSuccess: string;
  total: number;
  car: Icar;
  totalData: {
    totalCar: number;
    totalBlog: number;
    totalBooking: number;
    totalUser: number;
  };
}

const initialState: CarState = {
  loading: false,
  error: "",
  success: false,
  cars: [],
  labelSuccess: "",
  openSnackbar: false,
  total: 0,
  car: null,
  totalData: {
    totalCar: 0,
    totalBlog: 0,
    totalBooking: 0,
    totalUser: 0,
  },
};
const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    closeSnackBar: (state) => {
      state.openSnackbar = false;
    },
  },
  extraReducers: (builder) => {
    //get all car
    builder.addCase(getCar.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCar.fulfilled, (state, { payload }) => {
      state.cars = payload.cars;
      state.total = payload.carCount;
    });
    builder.addCase(getCar.rejected, (state, { payload }) => {
      state.success = false;
    });

    builder.addCase(getTotalData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTotalData.fulfilled, (state, { payload }) => {
      state.totalData = payload;
    });
    builder.addCase(getTotalData.rejected, (state, { payload }) => {
      state.success = false;
    });

    //get-car-by-user
    builder.addCase(getCarByUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCarByUser.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.cars = payload;
    });
    builder.addCase(getCarByUser.rejected, (state, { payload }) => {
      state.success = false;
    });
    //get-one

    builder.addCase(getCarOne.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCarOne.fulfilled, (state, { payload }) => {
      state.car = payload;
    });
    builder.addCase(getCarOne.rejected, (state, { payload }) => {
      state.success = false;
    });

    //  expried;
    builder.addCase(approveCar.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(approveCar.fulfilled, (state, { payload }) => {
      if (payload.status === "success") {
        state.error = "";
        state.labelSuccess = `Update car success!`;
        state.openSnackbar = true;
        state.cars = state.cars.map((car) => {
          if (car._id === payload.id) {
            const activeCar = payload.active === 1 ? "true" : "false";
            car.active = activeCar;
          }
          return car;
        });
      }
    });
    builder.addCase(approveCar.rejected, (state, { payload }) => {
      state.labelSuccess = "";
      state.error = `Approve car failed`;
      state.openSnackbar = true;
    });

    //hide-show
    builder.addCase(hideShowCar.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(hideShowCar.fulfilled, (state, { payload }) => {
      console.log(payload);
      // if (payload.status === "success") {
      //   state.error = "";
      //   state.labelSuccess = `Update car success!`;
      //   state.openSnackbar = true;
      //   state.cars = state.cars.map((car) => {
      //     if (car._id === payload.id) {
      //       const activeCar = payload.active === 1 ? "true" : "false";
      //       car.active = activeCar;
      //     }
      //     return car;
      //   });
      // }
    });
    builder.addCase(hideShowCar.rejected, (state, { payload }) => {
      // state.labelSuccess = "";
      // state.error = `Approve car failed`;
      // state.openSnackbar = true;
    });
    //update
    builder.addCase(updateCar.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCar.fulfilled, (state, { payload }) => {
      if (payload.status === "success") {
        console.log(payload);
        state.error = "";
        state.labelSuccess = `Cập nhật xe thành công!`;
        state.openSnackbar = true;
        state.cars = state.cars.map((car) => {
          if (car._id === payload.updateCar._id) {
            car.name = payload.updateCar.name;
            car.capacity = payload.updateCar.capacity;
            car.fuelType = payload.updateCar.fuelType;
            car.autoMarket = payload.updateCar.autoMarket;
            car.status = payload.updateCar.status;
            car.doorNumber = payload.updateCar.doorNumber;
            car.yearCreated = payload.updateCar.yearCreated;
            car.price = payload.updateCar.price;
            car.numbereatSeats = payload.updateCar.numbereatSeats;
            car.origin = payload.updateCar.origin;
            car.colorOutSide = payload.updateCar.colorOutSide;
            car.colorInSide = payload.updateCar.colorInSide;
            car.popular = payload.updateCar.popular;
            car.gear = payload.updateCar.gear;
            car.note = payload.updateCar.note;
            car.image = payload.updateCar.image;
            car.origin = payload.updateCar.origin;
          }
          return car;
        });
      }
    });
    builder.addCase(updateCar.rejected, (state, { payload }) => {
      state.labelSuccess = "";
      state.error = `Update car failed`;
      state.openSnackbar = true;
    });
    //createCar
    builder.addCase(createCarFormdata.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        state.error = "";
        state.labelSuccess = "Bạn đã tạo xe thành công!";
        state.openSnackbar = true;
        state.cars.push({
          _id: action.payload.newCar._id,
          name: action.payload.newCar.name,
          capacity: action.payload.newCar.capacity,
          fuelType: action.payload.newCar.fuelType,
          autoMarket: action.payload.newCar.autoMarket,
          status: action.payload.newCar.status,
          doorNumber: action.payload.newCar.doorNumber,
          yearCreated: action.payload.newCar.yearCreated,
          price: action.payload.newCar.price,
          consumeFuel: action.payload.newCar.consumeFuel,
          numbereatSeats: action.payload.newCar.numbereatSeats,
          colorOutSide: action.payload.newCar.colorOutSide,
          colorInSide: action.payload.newCar.colorInSide,
          popular: action.payload.newCar.popular,
          gear: action.payload.newCar.gear,
          active: action.payload.newCar.active,
          note: action.payload.newCar.note,
          image: action.payload.newCar.image,
          origin: action.payload.newCar.origin,
          user: action.payload.user,
          bookedTimeSlots: [],
        });
      }
    });
    builder.addCase(createCarFormdata.rejected, (state, action) => {
      state.labelSuccess = "";
      state.error = `Register car failed`;
      state.openSnackbar = true;
    });
    //addcar
    builder.addCase(createCar.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        state.error = "";
        state.labelSuccess = "Bạn đã tạo xe thành công!";
        state.openSnackbar = true;
        state.cars.push({
          _id: action.payload.newCar._id,
          name: action.payload.newCar.name,
          capacity: action.payload.newCar.capacity,
          fuelType: action.payload.newCar.fuelType,
          autoMarket: action.payload.newCar.autoMarket,
          status: action.payload.newCar.status,
          doorNumber: action.payload.newCar.doorNumber,
          yearCreated: action.payload.newCar.yearCreated,
          price: action.payload.newCar.price,
          consumeFuel: action.payload.newCar.consumeFuel,
          numbereatSeats: action.payload.newCar.numbereatSeats,
          colorOutSide: action.payload.newCar.colorOutSide,
          colorInSide: action.payload.newCar.colorInSide,
          popular: action.payload.newCar.popular,
          gear: action.payload.newCar.gear,
          note: action.payload.newCar.note,
          image: action.payload.newCar.image,
          origin: action.payload.newCar.origin,
          user: action.payload.user,
          bookedTimeSlots: [],
        });
      }
    });

    builder.addCase(editCar.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.error = "";
        state.labelSuccess = action.payload.data;
        state.openSnackbar = true;
        state.cars = state.cars.map((car) => {
          if (car._id === action.meta.arg._id) {
            car.name = action.meta.arg.name;
            car.capacity = action.meta.arg.capacity;
            car.fuelType = action.meta.arg.fuelType;
            car.autoMarket = action.meta.arg.autoMarket;
            car.status = action.meta.arg.status;
            car.doorNumber = action.meta.arg.doorNumber;
            car.yearCreated = action.meta.arg.yearCreated;
            car.price = action.meta.arg.price;
            car.numbereatSeats = action.meta.arg.numbereatSeats;
            car.origin = action.meta.arg.origin;
            car.colorOutSide = action.meta.arg.colorOutSide;
            car.colorInSide = action.meta.arg.colorInSide;
            car.popular = action.meta.arg.popular;
            car.gear = action.meta.arg.gear;
            car.note = action.meta.arg.note;
            car.image = action.meta.arg.image;
            car.origin = action.meta.arg.origin;
          }
          return car;
        });
      }
    });
    builder.addCase(deleteCar.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCar.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload.status === "success") {
        state.error = "";
        state.labelSuccess = `Xóa xe thành công`;
        state.openSnackbar = true;
        state.cars = state.cars.filter((car) => {
          return car._id !== action.payload.id;
        });
      }
    });
    builder.addCase(deleteCar.rejected, (state, { payload }) => {
      state.labelSuccess = "";
      state.error = `Delete car failed`;
      state.openSnackbar = true;
    });
  },
});
export const { closeSnackBar } = carSlice.actions;
export default carSlice.reducer;
