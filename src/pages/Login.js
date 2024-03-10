import React, { useEffect, useState, useRef } from "react";
import blogging from "../img/Blogging.png";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUpValidation } from "../validations/signUpValidation";

const initialValues = {
  email: "",
  password: "",
};
const Login = () => {
  const [clicked, setClicked] = useState(0);

  const navigate = useNavigate();

  const { loggedInUser, achieved, loginMsg } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedInUser) {
      navigate("/dashboard");
    }
  }, [navigate, loggedInUser]);

  useEffect(() => {
    if (loginMsg) {
      if (achieved != null && achieved == false) toast.error(loginMsg);
    }
  }, [clicked]);

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpValidation,
    onSubmit: (values) => {
      dispatch(loginUser(values)).then(() => {
        setClicked(clicked + 1);
      });
    },
  });
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col sm:flex-row justify-center items-center m-0">
      <div className="w-1/2">
        <img className="w-full" src={blogging} alt="Blogger" />
      </div>
      <div className="w-1/2 flex flex-col justify-center">
        <h1 className="text-3xl sm:text-5xl dark:text-white">Login</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col mt-5">
          <label className="text-xl sm:text-2xl dark:text-white m-4 ">
            Email:
          </label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            className="placeholder:text-black-500 placeholder:italic  mx-3 p-3 rounded-3xl w-full sm:w-3/5 border border-gray-300 shadow-sm"
          ></input>
          {errors.email && (
            <span className="text-red-800 font-bold">* {errors.email}</span>
          )}
          <label className="text-xl sm:text-2xl dark:text-white m-4 ">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter your email"
            className="placeholder:text-black-300 placeholder:italic  mx-3 p-3 rounded-3xl w-full sm:w-3/5 border border-gray-300 shadow-sm"
          ></input>
          {errors.password && (
            <span className="text-red-800 font-bold">* {errors.password}</span>
          )}
          <button
            type="submit"
            name="Login"
            className="w-full sm:w-2/5 mx-3 bg-blue-500 mt-10 p-3 text-white rounded-full hover:bg-blue-300"
          >
            Login
          </button>
          <p className="text-white text-600 mt-2 mx-4">
            {" "}
            Don't have an account ?
            <Link to="/signup" className="text-blue mx-2">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
