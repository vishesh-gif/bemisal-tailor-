import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import bill_image_Reducer from "./bill_image_Slice";
const store = configureStore({
  reducer: {
    profileSlice: profileReducer,
    bill_image_slice: bill_image_Reducer,
  },
});

export default store;
