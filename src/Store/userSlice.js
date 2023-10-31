import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LINK_API } from "../Constants";
import jwt_decode from "jwt-decode";

//xử lý ở local
//user login
const saveUserToLocalStorage = (user) => {
  localStorage.setItem("userLogin", JSON.stringify(user));
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("userLogin");
};

export const getUser = () => {
  let user = localStorage.getItem("userLogin");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
};

//user info
const saveUserInfoToLocalStorage = (user) => {
  localStorage.setItem("userInfo", JSON.stringify(user));
};

const removeUserInfoFromLocalStorage = () => {
  localStorage.removeItem("userInfo");
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

      if (
        infoResponse?.data?.result?.role === 1 &&
        infoResponse?.data?.result?.provider
      ) {
        saveUserInfoToLocalStorage(infoResponse.data.result?.provider);
      } else if (
        infoResponse?.data?.result?.role === 0 &&
        infoResponse?.data?.result?.customer
      ) {
        saveUserInfoToLocalStorage(infoResponse.data.result?.customer);
      } else {
        saveUserInfoToLocalStorage(infoResponse.data.result);
      }
    }

    return user;
  }
);

// export const createUser = createAsyncThunk(
//   "user/createUser",
//   async (userCredentials) => {

//     console.log(userCredentials)
//     try {
//       const response = await axios.post(
//         `${LINK_API}/api/User/Register`,
//         userCredentials
//       );
//       return response;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

export const createCustomer = createAsyncThunk(
  "user/createCustomer",
  async (customerCredentials) => {
    const response = await axios.post(
      `${LINK_API}/api/Customer/Create`,
      customerCredentials
    );
    return response;
  }
);

export const createProvider = createAsyncThunk(
  "user/createUser",
  async (providerCredentials) => {
    const response = await axios.post(
      `${LINK_API}/api/Provider/Create`,
      providerCredentials
    );
    return response;
  }
);

//update profile profile
export const updateProvider = createAsyncThunk(
  "user/updateProvider",
  async ({id, providerCredentials}) => {

    try {
      const response = await axios.put(
        `${LINK_API}/api/Provider/Update?id=${id}`,
        providerCredentials
      );
      return response;
    } catch (err) {
      console.log(err);
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
        } else if (
          action.error.message === "Request failed with status code 404"
        ) {
          state.error = "Account not found!";
        } else {
          state.error = action.error.message;
        }
      })

      //create user
      // .addCase(createUser.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(createUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.user = action.payload;
      //   state.error = null;
      // })
      // .addCase(createUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.user = null;
      //   if (action.error.message === "Request failed with status code 400") {
      //     state.error = "Access Denied! Your email is already existed";
      //   } else {
      //     state.error = action.error.message;
      //   }
      // })

      //create customer
      .addCase(createCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        if (action.error.message === "Request failed with status code 400") {
          state.error = "Access Denied! Your email is already existed";
        } else {
          state.error = action.error.message;
        }
      })

      //create provider
      .addCase(createProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(createProvider.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        if (action.error.message === "Request failed with status code 400") {
          state.error = "Access Denied! Your email is already existed";
        } else {
          state.error = action.error.message;
        }
      })

      //update profile provider
      .addCase(updateProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateProvider.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      });
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
