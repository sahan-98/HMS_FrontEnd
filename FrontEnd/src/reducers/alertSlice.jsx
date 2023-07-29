import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    isVisible: false,
    message: "",
    severity: "",
  },
  reducers: {
    showAlert: (state, action) => {
      state.isVisible = action.payload.isVisible;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    hideAlert: (state) => {
      state.isVisible = false;
      state.message = "";
      state.severity = "";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
