import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LINK_API } from "../Constants";
import jwt_decode from "jwt-decode";

//xử lý ở local
const saveUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    //vì chưa có api nên sài tạm như thế này, sau này có thì sẽ làm kĩ hơn
    const response = await axios.post(
      `${LINK_API}/api/auth/login`,
      userCredentials
    );

    const token = response.data.accessToken;
    const user = jwt_decode(token).user;
    saveUserToLocalStorage(user);
    return user;
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userCredentials) => {
    try {
      const response = await axios.post(
        `${LINK_API}/api/users/register`,
        userCredentials
      );
      return response;
    } catch (error) {
      throw error;
    }
  } 
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      //login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;

        if (action.error.message === "Request failed with status code 401") {
          state.error = "Access Denied! Your password is not correct";
        } else if (action.error.message === "Request failed with status code 404"){
          state.error = "Account not found!";
        }else {
          state.error = action.error.message;
        }
      })
      //create user
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        if (action.error.message === "Request failed with status code 400") {
          state.error = "Access Denied! Your email is already existed";
        } else {
          state.error = action.error.message;
        }
      });
  },
  reducers: {
    logoutUser: (state) => {
      removeUserFromLocalStorage();
      state.loading = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
