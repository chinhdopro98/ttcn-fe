import { createSlice } from "@reduxjs/toolkit";
import { Category, IAutoMaker } from "../../interfaces/interface";
import {
  createAutomaker,
  deleteAutomaker,
  getAllAutoMaker,
  getAllCategory,
  updateAutomaker,
} from "../action/autoMakerAction";

import { bookingCar, getListBooking } from "../action/bookAction";

interface AutoMakerState {
  automakers: IAutoMaker[];
  categorys: Category[];
}
const initialState: AutoMakerState = {
  automakers: [],
  categorys: [],
};

const autoMakerSlice = createSlice({
  name: "automaker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAutoMaker.fulfilled, (state, action) => {
      state.automakers = action.payload.data;
    });

    builder.addCase(createAutomaker.fulfilled, (state, action) => {
      state.automakers.push({
        name_automaker: action.payload.data.name_automaker,
        id_category: action.payload.data.id_category,
      });
    });

    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.categorys = action.payload.data;
    });
    builder.addCase(updateAutomaker.fulfilled, (state, action) => {
      if (action.payload) {
        // state.error = "";
        // state.labelSuccess = action.payload.data;
        // state.openSnackbar = true;
        state.automakers.map((automaker) => {
          if (automaker._id === action.meta.arg._id) {
            automaker.name_automaker = action.meta.arg.name_automaker;
            automaker.id_category = action.meta.arg.id_category;
          }
        });
      }
    });
    builder.addCase(deleteAutomaker.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.automakers = state.automakers.filter((automaker) => {
          if (automaker._id !== action.meta.arg._id) return automaker;
        });
      }
    });
  },
});
export const {} = autoMakerSlice.actions;
export default autoMakerSlice.reducer;
