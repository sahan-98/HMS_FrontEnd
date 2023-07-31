import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "../reducers/alertSlice";
import heartDiseasePredictionReducer from "../reducers/heartDiseasePredictionSlice";

const store = configureStore({
  reducer: {
    alertHMS: alertReducer,
    heartDiseasePrediction: heartDiseasePredictionReducer,
  },
});

export default store;
