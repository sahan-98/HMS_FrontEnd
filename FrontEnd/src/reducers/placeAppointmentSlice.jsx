import { createSlice } from "@reduxjs/toolkit";

export const placeAppointmentSlice = createSlice({
  name: "placeAppointment",
  initialState: {
    appointmentId:undefined,
    detectionId:"",
    doctorid: "",
    patientid: "",
    bookingDate: "",
    appointmentType:"",
    type: "",
    fee: "",
    doctorAvailability: "",
  },
  reducers: {
    placeAppointment: (state, action) => {
      state.appointmentId = action.payload.appointmentId;
      state.detectionId = action.payload.detectionId;
      state.doctorid = action.payload.doctorid;
      state.patientid = action.payload.patientid;
      state.bookingDate = action.payload.bookingDate;
      state.appointmentType = action.payload.appointmentType;
      state.type = action.payload.type;
      state.fee = action.payload.fee;
      state.doctorAvailability = action.payload.doctorAvailability;
    },
    clearDetails: (state) => {
      state.appointmentId = "";
      state.detectionId = "";
      state.doctorid = "";
      state.patientid = "";
      state.bookingDate = "";
      state.appointmentType = "";
      state.type = "";
      state.fee = "";
      state.doctorAvailability = "";
    },
  },
});

export const { placeAppointment, clearDetails } = placeAppointmentSlice.actions;
export default placeAppointmentSlice.reducer;
