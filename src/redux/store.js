import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
const store = configureStore({
  reducer: {
    profileSlice: profileReducer,
  },
});

export default store;
