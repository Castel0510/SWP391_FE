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

const saveUserInfoToLocalStorage = (user) => {
  localStorage.setItem("userInfo", JSON.stringify(user));
};

const removeUserInfoFromLocalStorage = () => {
  localStorage.removeItem("userInfo");
};

export const getUser = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
};

export const getUserInfoInLocalStorage = () => {
  let user = localStorage.getItem("userInfo");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    const response = await axios.post(
      `${LINK_API}/api/User/Login`,
      userCredentials
    );

    const token = response.data.result;
    const user = jwt_decode(token);
    saveUserToLocalStorage(user);

    if (response.status === 200) {
      const id = user.Id;
      const infoResponse = await axios.get(
        `${LINK_API}/api/User/Info?id=${id}`
      );
      saveUserInfoToLocalStorage(infoResponse?.data.result);
    }

    return user;
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userCredentials) => {

    console.log(userCredentials)
    try {
      const response = await axios.post(
        `${LINK_API}/api/User/Register`,
        userCredentials
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

// export const getUserInfo = createAsyncThunk("user/getUserInfo", async (id) => {
//   const response = await axios.get(`${LINK_API}/api/User/Info?id=${id}`);
//   saveUserInfoToLocalStorage(response?.data.result);
//   console.log(response);
//   return response;
// });

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
        } else if (
          action.error.message === "Request failed with status code 404"
        ) {
          state.error = "Account not found!";
        } else {
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
      })
      //get user info
      // .addCase(getUserInfo.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(getUserInfo.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.user = action.payload;
      //   state.error = null;
      // })
      // .addCase(getUserInfo.rejected, (state, action) => {
      //   state.loading = false;
      //   state.user = null;
      //   state.error = action.error.message;
      // });
  },
  reducers: {
    logoutUser: (state) => {
      removeUserFromLocalStorage();
      removeUserInfoFromLocalStorage();

      state.loading = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
