import { configureStore } from "@reduxjs/toolkit";
import carReducer from "../reducer/carSlice";
import userReducer from "../reducer/userSlice";
import bookingReducer from "../reducer/bookingSlice";
import autoMakerReducer from "../reducer/automakerSlice";
import blogReducer from "../reducer/blogSlice";
export const store = configureStore({
  reducer: {
    car: carReducer,
    user: userReducer,
    booking: bookingReducer,
    automaker: autoMakerReducer,
    blog: blogReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
