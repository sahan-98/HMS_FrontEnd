import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "../reducers/alertSlice";

const store = configureStore({
  reducer: {
    alertHMS: alertReducer,
  },
});

export default store;
