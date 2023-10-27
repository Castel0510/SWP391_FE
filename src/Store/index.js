import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./userSlice";

const store = configureStore({
  reducer: {
    user: useReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["your/action/type"],
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        ignoredPaths: ["items.dates"],
      },
    }),
});

export default store;
