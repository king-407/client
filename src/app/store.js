import { configureStore } from "@reduxjs/toolkit";
import userDetailReducer from "../Reducers/authReducer";
export const store = configureStore({
  reducer: {
    user: userDetailReducer,
  },
});
