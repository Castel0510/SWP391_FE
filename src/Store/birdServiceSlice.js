import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LINK_API } from "../Constants";



export const getById = createAsyncThunk(
    "birdservice/getById",
    async () => {
        try {
            const response = await axios.get(`${LINK_API}/api/BirdService/GetById?id=${id}`);
            return response;
        } catch (err) { }
    }
);

export const getByProviderId = createAsyncThunk(
    "birdservice/getByProviderId",
    async () => {
        try {
            const response = await axios.get(`${LINK_API}/api/BirdService/GetByProviderId?id=${id}`);
            return response;
        } catch (err) { }
    }
);

export const getAllService = createAsyncThunk(
    "birdservice/getAllService",
    async () => {
        try {
            const response = await axios.get(`${LINK_API}/api/BirdService/GetAllService?pageIndex=0&pageSize=9999`);
            return response;
        } catch (err) { }
    });

export const Create = createAsyncThunk(
    "birdservice/Create",
    async () => {
        try {
            const response = await axios.post(
                `${LINK_API}/api/BirdService/Create`
            );
            return response;
        } catch (err) { }
    }
);

export const Update = createAsyncThunk(
    "birdservice/Update",
    async () => {
        try {
            const response = await axios.put(`${LINK_API}/api/BirdService/Update?id=${id}`);
            return response;
        } catch (err) { }
    }
);

export const Delete = createAsyncThunk(
    "birdservice/Delete",
    async () => {
        try {
            const response = await axios.delete(
                `${LINK_API}/api/BirdService/Delete?id=${id}`
            );
            return response;
        } catch (err) { }
    }
);


const birdServiceSlice = createSlice({
    name: "birdservice",
    initialState: {
        loading: false,
        user: [],
        error: null,
    },
    extraReducers: (builder) => {
        builder
            //getById
            .addCase(getById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(getById.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message;
            })
            //getByProviderId
            .addCase(getByProviderId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getByProviderId.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(getByProviderId.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message;
            })
            //getAllService
            .addCase(getAllService.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllService.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(getAllService.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message;
            })
            //Create
            .addCase(Create.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(Create.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(Create.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message;
            })
            //Update
            .addCase(Update.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(Update.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(Update.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message;
            })
            //Delete
            .addCase(Delete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(Delete.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(Delete.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message;
            })


    },
    reducers: {},
});

export default birdServiceSlice.reducer;
