import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import resetValidation from "../validations/resetValidation";
import { changePassword, resetState } from "../Reducers/resetReducer";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
const initialValues = {
  password: "",
  confirmPassword: "",
};
const ResetPassword = () => {
  const [click, setClick] = useState(0);
  const { resetId } = useParams();
  const dispatch = useDispatch();
  const { achieved, resetMsg, loading } = useSelector((state) => state.reset);
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,

    errors,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: resetValidation,
    onSubmit: async (values) => {
      dispatch(changePassword({ ...values, resetId })).then(() => {
        setClick(click + 1);
      });
    },
  });

  /// reseting the value of reducers state //
  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);

  /// toast messages //
  useEffect(() => {
    if (achieved !== null) {
      if (achieved === true) {
        toast.success(resetMsg);
      } else {
        toast.error(resetMsg);
      }
    }
  }, [click]);

  /// Displaying the toast messages ///
  if (loading) {
    return (
      <div className="min-h-screen h bg-black flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div ClassName="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div ClassName="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
        <h2 ClassName="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Change Password
        </h2>
        <form
          onSubmit={handleSubmit}
          ClassName="mt-4 space-y-4 lg:mt-5 md:space-y-5"
          action="#"
        >
          <div>
            <label
              for="password"
              ClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <input
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              ClassName="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
            {errors.password && (
              <span className="text-red-800 font-bold">
                * {errors.password}
              </span>
            )}
          </div>
          <div>
            <label
              for="confirm-password"
              ClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm password
            </label>
            <input
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              id="confirm-password"
              placeholder="••••••••"
              ClassName="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
            {errors.confirmPassword && (
              <span className="text-red-800 font-bold">
                * {errors.confirmPassword}
              </span>
            )}
          </div>

          <button
            type="submit"
            ClassName="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Reset passwod
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
