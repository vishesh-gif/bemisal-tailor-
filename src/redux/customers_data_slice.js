import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  billData: [],
};

const customers_data_slice = createSlice({
  name: "billImage",
  initialState,
  reducers: {
    addCustomersData: (state, action) => {
      state.billData = action.payload;
    },
    deleteCustomer: (state, action) => {
      state.billData = state.billData.filter(
        (data) => data.$id != action.payload,
      );
    },
  },
});

export const { addCustomersData, deleteCustomer } =
  customers_data_slice.actions;

export default customers_data_slice.reducer;
