import alertReducer from "../reducers/alertSlice";
import heartDiseasePredictionReducer from "../reducers/heartDiseasePredictionSlice";
import loginReducer from "../reducers/loginSlice";
import patientReducer from "../reducers/patientSlice";
import doctorReducer from "../reducers/doctorSlice";
import placeAppointmentReducer from "../reducers/placeAppointmentSlice";
import labAssistantReducer from "../reducers/labAssistantSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["alertHMS", "heartDiseasePrediction", "placeAppointment"],
};
const rootReducer = combineReducers({
  alertHMS: alertReducer,
  heartDiseasePrediction: heartDiseasePredictionReducer,
  login: loginReducer,
  patient: patientReducer,
  doctor: doctorReducer,
  placeAppointment: placeAppointmentReducer,
  labAssistant: labAssistantReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
