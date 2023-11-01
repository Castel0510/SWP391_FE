// customerSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  customers: {},
  status: "idle",
  error: null,
};

export const fetchCustomerById = createAsyncThunk(
  "customers/fetchCustomerById",
  async (customerId) => {
    const apiUrl = `https://apis20231023230305.azurewebsites.net/api/Customer/GetById?id=${customerId}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const data = await response.json();
    return data.result;
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customers[action.payload.id] = action.payload;
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default customerSlice.reducer;
