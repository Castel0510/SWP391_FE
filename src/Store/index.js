import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./userSlice";
import birdServiceReducer from "./birdServiceSlice";

const store = configureStore({
  reducer: {
    user: useReducer,
    birdService: birdServiceReducer,
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
