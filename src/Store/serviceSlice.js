// serviceSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  services: [],
  status: "idle",
  error: null,
};

export const fetchServices = createAsyncThunk("services/fetchServices", async () => {
  try {
    const apiUrl = "https://apis20231023230305.azurewebsites.net/api/BirdService/GetAllService?pageIndex=0&pageSize=10";
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const data = await response.json();

    return data.result.items;
  } catch (error) {
    throw error;
  }
});

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = action.payload; 
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
  
});

export default serviceSlice.reducer;
