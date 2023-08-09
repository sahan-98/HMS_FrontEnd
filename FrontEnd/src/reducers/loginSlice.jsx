import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    userId: "",
  },
  reducers: {
    login: (state, action) => {
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.userId = "";
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
