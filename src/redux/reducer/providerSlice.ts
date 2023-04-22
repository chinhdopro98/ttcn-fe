import { createSlice } from "@reduxjs/toolkit";
import { ProviderData } from "../../interfaces/interface";
import { getAllProvider } from "../action/providerAction";

interface ProviderState {
  providers: ProviderData[];
}
const initialState = {
  providers: [],
};
const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all provider
    builder.addCase(getAllProvider.fulfilled, (state, action) => {
      console.log(action);
      state.providers = action.payload;
    });
  },
});
export const {} = providerSlice.actions;
export default providerSlice.reducer;
