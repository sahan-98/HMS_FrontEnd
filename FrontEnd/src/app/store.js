import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "../reducers/alertSlice";
import heartDiseasePredictionReducer from "../reducers/heartDiseasePredictionSlice";
import loginReducer from "../reducers/loginSlice";

const store = configureStore({
  reducer: {
    alertHMS: alertReducer,
    heartDiseasePrediction: heartDiseasePredictionReducer,
    login: loginReducer,
  },
});

export default store;
