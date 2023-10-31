import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LINK_API } from "../Constants";

export const getAllUser = createAsyncThunk(
  "management/getAllUser",
  async ({pageIndex, pageSize}) => {
    try {
      const response = await axios.get(`${LINK_API}/api/User/GetAllUser?pageIndex=${pageIndex}&pageSize=${pageSize}`);
      return response;
    } catch (err) {
      console.log(err)
    }
  }
);

export const getAllProvider = createAsyncThunk(
  "management/getAllProvider",
  async ({pageIndex, pageSize}) => {
    try {
      const response = await axios.get(`${LINK_API}/api/Provider/Get?pageIndex=${pageIndex}&pageSize=${pageSize}`);
      return response;
    } catch (err) {
      console.log(err)
    }
  }
);


const dashboardSlice = createSlice({
  name: "management",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      //getAllUser
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })
      //getAllProvider
      .addCase(getAllProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getAllProvider.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })

  },
  reducers: {},
});

export default dashboardSlice.reducer;
