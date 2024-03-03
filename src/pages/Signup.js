import React, { useEffect } from "react";
import blogging from "../img/Blogging.png";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../Reducers/authReducer";
// import { signUpValidation } from "./signUpValidation/signUpValidation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialValues = {
  name: "",
  email: "",
  password: "",
  user_name: "",
  image: null,
};
const Signup = () => {
  const dispatch = useDispatch();
  const { msg, achieved } = useSelector((state) => state.user);
  useEffect(() => {
    if (msg) {
      if (achieved != null && achieved == false) toast.error(msg);
      else if (achieved != null && achieved == true) {
        toast.success(msg);
        toast.success("You may login now");
      }
    }
  }, [msg]);

  const { values, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValues,

      onSubmit: async (values) => {
        dispatch(createUser(values));
        // const { msg } = useSelector((state) => state.user);
        // toast.success(msg);
      },
    });
  const handleFileChange = (event) => {
    setFieldValue("image", event.currentTarget.files[0]);
  };
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col sm:flex-row justify-center items-center m-0">
      <div className="w-1/2">
        <img className="w-full" src={blogging} alt="Blogger" />
      </div>
      <div className="w-1/2 flex flex-col justify-center">
        <h1 className="text-3xl sm:text-5xl dark:text-white">Login</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col mt-5">
          <label className="text-xl sm:text-2xl dark:text-white m-4 ">
            Name:
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            className="placeholder:text-black-500 placeholder:italic  mx-3 p-3 rounded-3xl w-full sm:w-3/5 border border-gray-300 shadow-sm"
          ></input>
          {/* {errors.email && (
            <small className="text-white mt-2">* {errors.email}</small>
          )} */}
          <label className="text-xl sm:text-2xl dark:text-white m-4 ">
            Email:
          </label>
          <input
            type="text"
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter your email"
            className="placeholder:text-black-300 placeholder:italic  mx-3 p-3 rounded-3xl w-full sm:w-3/5 border border-gray-300 shadow-sm"
          ></input>
          <label className="text-xl sm:text-2xl dark:text-white m-4 ">
            Password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            className="placeholder:text-black-500 placeholder:italic  mx-3 p-3 rounded-3xl w-full sm:w-3/5 border border-gray-300 shadow-sm"
          ></input>
          <label className="text-xl sm:text-2xl dark:text-white m-4 ">
            User Name:
          </label>
          <input
            type="text"
            name="user_name"
            placeholder="Enter your user name"
            value={values.user_name}
            onBlur={handleBlur}
            onChange={handleChange}
            className="placeholder:text-black-500 placeholder:italic  mx-3 p-3 rounded-3xl w-full sm:w-3/5 border border-gray-300 shadow-sm"
          ></input>

          <label
            class="text-xl sm:text-2xl m-4 text-gray-900 dark:text-white"
            for="file_input"
          >
            Upload file
          </label>
          <input
            class="block w-1/4 text-sm mx-3  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            name="image"
            onChange={handleFileChange}
          />

          <button
            type="submit"
            name="Signup"
            className="w-full sm:w-2/5 mx-3 bg-blue-500 mt-10 p-3 text-white rounded-full hover:bg-blue-300"
          >
            <ToastContainer />
            Signup
          </button>
          <p className="text-white text-600 mt-2 mx-4">
            {" "}
            Already have an account ?
            <Link to="/signup" className="text-blue mx-2">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
