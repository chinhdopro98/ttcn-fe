import { createSlice } from "@reduxjs/toolkit";
import { IUserData } from "../../interfaces/interface";
import {
  deleteUser,
  getAllUser,
  updateUser,
  userLogin,
  userRegister,
} from "../action/userAction";

interface UserState {
  loading: boolean;
  error: string;
  success: boolean;
  userInfos: IUserData[];
  openSnackbar: boolean;
  labelSuccess: string;
  registrationStatus: string;
  accessToken: string;
}
const initialState: UserState = {
  loading: false,
  registrationStatus: "idle",
  error: "",
  success: false,
  userInfos: [],
  labelSuccess: "",
  openSnackbar: false,
  accessToken: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setOpenSnackbar: (state, action) => {
      state.openSnackbar = action.payload;
      state.error = "";
      state.labelSuccess = "";
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.success = true;
      state.accessToken = action.payload.token;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.success = false;
    });

    //register
    builder.addCase(userRegister.pending, (state) => {
      state.registrationStatus = "loading";
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.error = "";
      state.labelSuccess = `Create user success!`;
      state.openSnackbar = true;
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.labelSuccess = "";
      state.error = `Create user failed`;
      state.openSnackbar = true;
    });

    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.userInfos = action.payload;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.error = "";
        state.labelSuccess = action.payload.data;
        state.openSnackbar = true;
        state.userInfos.map((user) => {
          if (user._id === action.meta.arg._id) {
            user.firstname = action.meta.arg.firstname;
            user.username = action.meta.arg.username;
            user.email = action.meta.arg.email;
            user.phone = action.meta.arg.phone;
            user.password = action.meta.arg.password;
            user.role = action.meta.arg.role;
          }
        });
      }
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      console.log(action);
      if (action.payload.status === 200) {
        state.error = "";
        state.labelSuccess = action.payload.data;
        state.openSnackbar = true;
        state.userInfos = state.userInfos.filter((user) => {
          if (user._id !== action.meta.arg._id) return user;
        });
      }
    });
  },
});
export const { setOpenSnackbar } = userSlice.actions;
export default userSlice.reducer;
