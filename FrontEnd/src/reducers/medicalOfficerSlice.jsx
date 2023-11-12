import { createSlice } from "@reduxjs/toolkit";

export const medicalOfficerSlice = createSlice({
  name: "medicalOfficer",
  initialState: {
    _id: "",
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
    setMedicalOfficer: (state, action) => {
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
    clearMedicalOfficer: (state) => {
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

export const { setMedicalOfficer, clearMedicalOfficer } = medicalOfficerSlice.actions;
export default medicalOfficerSlice.reducer;
