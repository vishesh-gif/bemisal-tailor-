import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: false,
  userData: null,
};

const profileSlice = createSlice({
  name: "profileStatus",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.loginStatus = true;
      state.userData = action.payload;
    },
    logOut: (state) => {
      state.loginStatus = false;
      state.userData = null;
    },
  },
});

export const { logIn, logOut } = profileSlice.actions;

export default profileSlice.reducer;
