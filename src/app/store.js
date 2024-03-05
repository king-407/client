import { configureStore } from "@reduxjs/toolkit";
import userDetailReducer from "../Reducers/authReducer";
import postReducer from "../Reducers/postReducer";
export const store = configureStore({
  reducer: {
    user: userDetailReducer,
    posts: postReducer,
  },
});
