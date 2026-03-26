import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  billData: [],
  customerCount: 0,
};

const customers_data_slice = createSlice({
  name: "billImage",
  initialState,
  reducers: {
    addCustomersData: (state, action) => {
      state.billData = action.payload;
    },
    setCustomerCount: (state, action) => {
      state.customerCount = action.payload;
    },
    deleteCustomer: (state, action) => {
      state.billData = state.billData.filter(
        (data) => data.id != action.payload,
      );
    },
    addMoreBill: (state, action) => {
      state.billData = [...state.billData, ...action.payload];
    },
  },
});

export const {
  addCustomersData,
  deleteCustomer,
  addMoreBill,
  setCustomerCount,
} = customers_data_slice.actions;

export default customers_data_slice.reducer;
