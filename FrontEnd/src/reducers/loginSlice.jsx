import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    userId: "",
    userType:""
  },
  reducers: {
    login: (state, action) => {
      state.userId = action.payload.userId;
      state.userType = action.payload.userType;
    },
    logout: (state) => {
      state.userId = "";
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
