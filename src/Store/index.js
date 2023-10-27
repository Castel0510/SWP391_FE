import { configureStore } from "@reduxjs/toolkit"
import  useReducer  from "./userSlice"
import  commentReducer  from "./commentSlice"
import  customerReducer  from "./customerSlice"
import serviceReducer from "./serviceSlice"
const store = configureStore({
    reducer: {
        user: useReducer,
        comments: commentReducer,
        customers: customerReducer, 
        services : serviceReducer,
    }
})

export default store;