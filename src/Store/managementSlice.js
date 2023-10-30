import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LINK_API } from "../Constants";

export const getCustomer = createAsyncThunk(
  "management/getCustomer",
  async () => {
    try {
      const response = await axios.get(`${LINK_API}/api/Dashboard/GetCustomer`);
      return response;
    } catch (err) {}
  }
);

export const getCustomerInMonth = createAsyncThunk(
  "dashboard/getCustomerInMonth",
  async () => {
    try {
      const response = await axios.get(
        `${LINK_API}/api/Dashboard/GetCustomerInMonth`
      );
      return response;
    } catch (err) {}
  }
);

export const getOrder = createAsyncThunk("dashboard/getOrder", async () => {
  try {
    const response = await axios.get(`${LINK_API}/api/Dashboard/GetOrder`);
    return response;
  } catch (err) {}
});

export const getOrderInMonth = createAsyncThunk(
  "dashboard/getOrderInMonth",
  async () => {
    try {
      const response = await axios.get(
        `${LINK_API}/api/Dashboard/GetOrderInMonth`
      );
      return response;
    } catch (err) {}
  }
);

export const getProvider = createAsyncThunk(
  "dashboard/getProvider",
  async () => {
    try {
      const response = await axios.get(`${LINK_API}/api/Dashboard/GetProvider`);
      return response;
    } catch (err) {}
  }
);

export const getProviderInMonth = createAsyncThunk(
  "dashboard/getProviderInMonth",
  async () => {
    try {
      const response = await axios.get(
        `${LINK_API}/api/Dashboard/GetProviderInMonth`
      );
      return response;
    } catch (err) {}
  }
);

export const getUserInMonth = createAsyncThunk(
  "dashboard/getUserInMonth",
  async () => {
    try {
      const response = await axios.get(
        `${LINK_API}/api/Dashboard/GetUserInMonth`
      );
      return response;
    } catch (err) {}
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      //getCustomer
      .addCase(getCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })
      //getCustomerInMonth
      .addCase(getCustomerInMonth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomerInMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getCustomerInMonth.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })
      //getOrder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })
      //getOrderInMonth
      .addCase(getOrderInMonth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderInMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getOrderInMonth.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })
      //getProvider
      .addCase(getProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getProvider.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })
      //getProviderInMonth
      .addCase(getProviderInMonth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProviderInMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getProviderInMonth.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })

      //getUserInMonth
      .addCase(getUserInMonth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserInMonth.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      });
  },
  reducers: {},
});

export default dashboardSlice.reducer;
