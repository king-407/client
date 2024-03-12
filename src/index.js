import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./pages/Login";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Signup from "./pages/Signup";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Dashboard from "./pages/Dashboard";
import SpeceficPost from "./pages/SpeceficPost";
import Create from "./pages/Create";
import { ToastContainer } from "react-toastify";
import FindPeople from "./pages/FindPeople";
import ResetPassword from "./pages/ResetPassword";
import Forgot from "./pages/Forgot";
import UserPost from "./pages/UserPost";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/posts/:postId" element={<SpeceficPost />} />
      <Route path="/create" element={<Create />} />
      <Route path="/findpeople" element={<FindPeople />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/users/reset/:resetId" element={<ResetPassword />} />
      <Route path="/user/post/:userId" element={<UserPost />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
