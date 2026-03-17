import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import customers_data_Reducer from "./customers_data_slice";
const store = configureStore({
  reducer: {
    profileSlice: profileReducer,
    customers_data_Slice: customers_data_Reducer,
  },
});

export default store;
