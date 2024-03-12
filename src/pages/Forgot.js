import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendToken, resetState } from "../Reducers/resetReducer";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "./Spinner";
const Forgot = () => {
  const [email, setEmail] = useState();
  const [click, setClick] = useState(0);

  const dispatch = useDispatch();
  const { achieved, resetMsg, loading } = useSelector((state) => state.reset);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  /// reseting value of reducers so that that toast does not trouble me after this //
  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);

  // displaying the toast messages //

  useEffect(() => {
    if (achieved !== null) {
      if (achieved === true) {
        toast.success(resetMsg);
      } else {
        toast.error(resetMsg);
      }
    }
  }, [click]);

  /// Spinner //

  if (loading) {
    return (
      <div className="min-h-screen h bg-black flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  /// Finally submitting ///

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email: email };
    dispatch(sendToken(data)).then(() => {
      setClick(click + 1);
    });
  };
  return (
    <div class=" min-h-screen bg-gray-800 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full p-6  rounded-lg shadow dark:border md:mt-0 sm:max-w-md bg-gray-800 dark:border-gray-700 sm:p-8">
        <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Change Password
        </h2>
        <form
          class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
          action="#"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required=""
            />
          </div>

          <button
            type="submit"
            class="w-3/4   bg-blue-500 mt-10 p-3 text-white rounded-full hover:bg-blue-300"
          >
            Reset passwod
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
