import { createSlice } from "@reduxjs/toolkit";

export const labAssistantSlice = createSlice({
  name: "labAssistant",
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
    setLabAssistant: (state, action) => {
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
    clearLabAssistant: (state) => {
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

export const { setLabAssistant, clearLabAssistant } = labAssistantSlice.actions;
export default labAssistantSlice.reducer;
