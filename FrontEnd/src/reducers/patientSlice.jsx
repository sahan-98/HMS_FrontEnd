import { createSlice } from "@reduxjs/toolkit";

export const patientSlice = createSlice({
  name: "patient",
  initialState: {
    _id: "64d48fb5abfd5cf9d50fafe1",
    userName: "",
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    address: "",
    dateOfBirth: "",
    gender: "",
  },
  reducers: {
    setPatient: (state, action) => {
      state._id = action.payload._id;
      state.userName = action.payload.userName;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.mobile = action.payload.mobile;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.gender = action.payload.gender;
    },
    clearPatient: (state) => {
      state._id = "";
      state.userName = "";
      state.firstname = "";
      state.lastname = "";
      state.mobile = "";
      state.email = "";
      state.address = "";
      state.dateOfBirth = "";
      state.gender = "";
    },
  },
});

export const { setPatient, clearPatient } = patientSlice.actions;
export default patientSlice.reducer;
