import { createSlice } from "@reduxjs/toolkit";

export const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    _id: "",
    doctorid: "",
    userName: "",
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    sunAvailbleTime: "",
    monAvailbleTime: "",
    tueAvailbleTime: "",
    wensAvailbleTime: "",
    thusAvailbleTime: "",
    friAvailbleTime: "",
    satAvailbleTime: "",
  },
  reducers: {
    setDoctor: (state, action) => {
      state._id = action.payload._id;
      state.doctorid = action.payload.doctorid;
      state.userName = action.payload.userName;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.mobile = action.payload.mobile;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.gender = action.payload.gender;
      state.sunAvailbleTime = action.payload.sunAvailbleTime;
      state.monAvailbleTime = action.payload.monAvailbleTime;
      state.tueAvailbleTime = action.payload.tueAvailbleTime;
      state.wensAvailbleTime = action.payload.wensAvailbleTime;
      state.thusAvailbleTime = action.payload.thusAvailbleTime;
      state.friAvailbleTime = action.payload.friAvailbleTime;
      state.satAvailbleTime = action.payload.satAvailbleTime;
    },
    clearDoctor: (state) => {
      state._id = "";
      state.doctorid = "";
      state.userName = "";
      state.firstname = "";
      state.lastname = "";
      state.mobile = "";
      state.email = "";
      state.address = "";
      state.dateOfBirth = "";
      state.gender = "";
      state.sunAvailbleTime = "";
      state.monAvailbleTime = "";
      state.tueAvailbleTime = "";
      state.wensAvailbleTime = "";
      state.thusAvailbleTime = "";
      state.friAvailbleTime = "";
      state.satAvailbleTime = "";
    },
  },
});

export const { setDoctor, clearDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
