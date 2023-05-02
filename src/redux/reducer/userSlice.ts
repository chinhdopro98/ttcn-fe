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
  role: string;
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
  role: "",
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
      console.log(action.payload);
      state.accessToken = action.payload.token;
      state.role = action.payload.role;
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
      if (action.payload.status === "success") {
        state.error = "";
        state.labelSuccess = "Update user success";
        state.openSnackbar = true;
        state.userInfos.map((user) => {
          if (user._id === action.payload.updateUser._id) {
            user.firstname = action.payload.updateUser.firstname;
            user.lastname = action.payload.updateUser.lastname;
            user.username = action.payload.updateUser.username;
            user.email = action.payload.updateUser.email;
            user.phone = action.payload.updateUser.phone;
            user.role = action.payload.updateUser.role;
          }
        });
      } else {
        state.labelSuccess = "";
        state.error = `Update user failed`;
        state.openSnackbar = true;
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.labelSuccess = "";
      state.error = `Create user failed`;
      state.openSnackbar = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      console.log(action);
      state.error = "";
      state.labelSuccess = `Create user success!`;
      state.openSnackbar = true;
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
