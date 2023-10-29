import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./userSlice";
import commentReducer from "./commentSlice";
import customerReducer from "./customerSlice";
import serviceReducer from "./serviceSlice";

const store = configureStore({
  reducer: {
    user: useReducer,
    comments: commentReducer,
    customers: customerReducer, 
    services : serviceReducer,
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
