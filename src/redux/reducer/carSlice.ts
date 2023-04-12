import { createSlice } from "@reduxjs/toolkit";
import { AddCar, Icar, UpdateCar } from "../../interfaces/interface";
import {
  createCar,
  deleteCar,
  editCar,
  getCar,
  getCarOne,
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

    builder.addCase(createCar.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.error = "";
        state.labelSuccess = action.payload.data;
        state.openSnackbar = true;
        state.cars.push({
          _id: "",
          name: action.meta.arg.name,
          capacity: action.meta.arg.capacity,
          fuelType: action.meta.arg.fuelType,
          autoMarket: action.meta.arg.autoMarket,
          status: action.meta.arg.status,
          doorNumber: action.meta.arg.doorNumber,
          yearCreated: action.meta.arg.yearCreated,
          price: action.meta.arg.price,
          consumeFuel: action.meta.arg.consumeFuel,
          numbereatSeats: action.meta.arg.numbereatSeats,
          colorOutSide: action.meta.arg.colorOutSide,
          colorInSide: action.meta.arg.colorInSide,
          popular: action.meta.arg.popular,
          gear: action.meta.arg.gear,
          note: action.meta.arg.note,
          image: action.meta.arg.image,
          origin: action.meta.arg.origin,
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
    builder.addCase(deleteCar.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.error = "";
        state.labelSuccess = action.payload.data;
        state.openSnackbar = true;
        state.cars.map((car) => {
          return car._id !== action.meta.arg._id;
        });
      }
    });
  },
});
export const { closeSnackBar } = carSlice.actions;
export default carSlice.reducer;
