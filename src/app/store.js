import { configureStore } from "@reduxjs/toolkit";
import userDetailReducer from "../Reducers/authReducer";
import postReducer from "../Reducers/postReducer";
import commentReducer from "../Reducers/CommentReducer";
import userActivity from "../Reducers/userReducer";
import resetReducer from "../Reducers/resetReducer";
export const store = configureStore({
  reducer: {
    user: userDetailReducer,
    posts: postReducer,
    comments: commentReducer,
    activity: userActivity,
    reset: resetReducer,
  },
});
