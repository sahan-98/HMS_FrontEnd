import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "../reducers/alertSlice";
import heartDiseasePredictionReducer from "../reducers/heartDiseasePredictionSlice";
import loginReducer from "../reducers/loginSlice";
import patientReducer from "../reducers/patientSlice";
import doctorReducer from "../reducers/doctorSlice";

const store = configureStore({
  reducer: {
    alertHMS: alertReducer,
    heartDiseasePrediction: heartDiseasePredictionReducer,
    login: loginReducer,
    patient: patientReducer,
    doctor: doctorReducer,
  },
});

export default store;
