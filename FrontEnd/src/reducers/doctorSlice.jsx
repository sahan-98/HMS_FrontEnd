import { createSlice } from "@reduxjs/toolkit";

export const doctorSlice = createSlice({
  name: "doctor",
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
    setDoctor: (state, action) => {
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
    clearDoctor: (state) => {
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

export const { setDoctor, clearDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
