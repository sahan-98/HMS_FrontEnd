import { createSlice } from "@reduxjs/toolkit";

export const heartDiseasePredictionSlice = createSlice({
  name: "heartDiseasePrediction",
  initialState: {
    appointmentId: "",
    name: "",
    age: 0,
    gender: "",
    chestPainType: "",
    cholestrol: 0,
    fastingBloodSugar: "",
    restingBloodPressure: 0,
    restingEcg: "",
    maxHeartRate: 0,
    stSlope: "",
    oldPeak: 0,
    exerciseAngina: "",
  },
  reducers: {
    setHeartDiseasePrediction: (state, action) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.gender = action.payload.gender;
      state.chestPainType = action.payload.chestPainType;
      state.cholestrol = action.payload.cholestrol;
      state.fastingBloodSugar = action.payload.fastingBloodSugar;
      state.restingBloodPressure = action.payload.restingBloodPressure;
      state.restingEcg = action.payload.restingEcg;
      state.maxHeartRate = action.payload.maxHeartRate;
      state.stSlope = action.payload.stSlope;
      state.oldPeak = action.payload.oldPeak;
      state.exerciseAngina = action.payload.exerciseAngina;
    },
    setAppointmentId: (state, action) => {
      state.appointmentId = action.payload.appointmentId;
    },

    clearHeartDiseasePrediction: (state) => {
      state.appointmentId = "";
      state.name = "";
      state.age = 0;
      state.gender = "";
      state.chestPainType = "";
      state.cholestrol = 0;
      state.fastingBloodSugar = "";
      state.restingBloodPressure = 0;
      state.restingEcg = "";
      state.maxHeartRate = 0;
      state.stSlope = "";
      state.oldPeak = 0;
      state.exerciseAngina = "";
    },
  },
});

export const {
  setHeartDiseasePrediction,
  clearHeartDiseasePrediction,
  setAppointmentId,
} = heartDiseasePredictionSlice.actions;
export default heartDiseasePredictionSlice.reducer;
