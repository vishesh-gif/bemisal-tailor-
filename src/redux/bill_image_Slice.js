import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  billImage: null,
};

const bill_image_slice = createSlice({
  name: "billImage",
  initialState,
  reducers: {
    addBillImage: (state, action) => {
      state.billImage = action.payload;
    },
  },
});

export const { addBillImage } = bill_image_slice.actions;

export default bill_image_slice.reducer;
