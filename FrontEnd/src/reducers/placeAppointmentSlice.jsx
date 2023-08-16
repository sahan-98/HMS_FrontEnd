import { createSlice } from "@reduxjs/toolkit";

export const placeAppointmentSlice = createSlice({
  name: "placeAppointment",
  initialState: {
    doctorid: "",
    patientid: "",
    bookingDate: "",
    type: "",
    fee: "",
    doctorAvailability: "",
  },
  reducers: {
    placeAppointment: (state, action) => {
      state.doctorid = action.payload.doctorid;
      state.patientid = action.payload.patientid;
      state.bookingDate = action.payload.bookingDate;
      state.type = action.payload.type;
      state.fee = action.payload.fee;
      state.doctorAvailability = action.payload.doctorAvailability;
    },
    clearDetails: (state) => {
      state.doctorid = "";
      state.patientid = "";
      state.bookingDate = "";
      state.type = "";
      state.fee = "";
      state.doctorAvailability = "";
    },
  },
});

export const { placeAppointment, clearDetails } = placeAppointmentSlice.actions;
export default placeAppointmentSlice.reducer;
