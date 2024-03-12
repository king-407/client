import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost, resetState } from "../Reducers/postReducer";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "./Spinner";
import { postValidation } from "../validations/postValidation";
import { logout } from "../Reducers/authReducer";
const initialValues = {
  content: "",
  title: "",
  category: "",

  image: null,
};
const Create = () => {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [clicked, setClicked] = useState(0);
  const dispatch = useDispatch();
  const { postMessage, achieved, loading } = useSelector(
    (state) => state.posts
  );

  const { loggedInUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (loggedInUser == null) {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (postMessage) if (achieved == true) toast.success(postMessage);
  }, [clicked]);

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: postValidation,
    onSubmit: (values) => {
      dispatch(createPost(values)).then(() => {
        setClicked(clicked + 1);
      });
    },
  });

  const handleFileChange = (event) => {
    setFieldValue("image", event.currentTarget.files[0]);
  };

  if (loading) {
    return (
      <div className="min-h-screen h bg-black flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  const signOut = () => {
    dispatch(logout());
  };
  return (
    <div className=" min-h-screen bg-black text-white">
      <div className="bg-teal-700 text-white top-0">
        <section className="flex items-center justify-between max-w-4xl mx-auto p-1">
          <h1 className="text-3xl font-medium p-3">🚀 Large</h1>
          <button
            onClick={signOut}
            name="Signup"
            className=" w-[12%]  bg-red-500  p-2 text-white rounded-full hover:bg-red-300"
          >
            Logout
          </button>
        </section>
      </div>
      <div className="flex flex-row justify-center my-4 text-3xl sm:text-4xl font-medium">
        Create Post
      </div>

      <div className="flex flex-col mt-5 justify-center items-center mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-center items-center "
        >
          <div className="w-full flex flex-col md:flex-row justify-center items-center mt-6">
            <label className="text-xl sm:text-2xl  text-white m-4 ">
              Title:
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter the title"
              value={values.title}
              onBlur={handleBlur}
              onChange={handleChange}
              className="placeholder:text-black-500 placeholder:italic  mx-6 p-3 rounded-3xl w-3/4 md:w-1/4 border border-gray-300 shadow-sm  text-black"
            ></input>
            {errors.title && (
              <span className="text-red-800 font-bold"> *{errors.title}</span>
            )}
          </div>

          <div className="w-full flex flex-col md:flex-row justify-center items-center mt-6">
            <label className="text-xl sm:text-2xl  m-1 ">Category:</label>
            <input
              type="text"
              name="category"
              placeholder="Enter the category"
              value={values.category}
              onBlur={handleBlur}
              onChange={handleChange}
              className="placeholder:text-black-500 placeholder:italic  mx-2 p-3 rounded-3xl w-3/4 md:w-1/4 border border-gray-300 shadow-sm  text-black"
            ></input>
            {errors.category && (
              <span className="text-red-800 font-bold">*{errors.category}</span>
            )}
          </div>

          <div className="w-full flex flex-col md:flex-row justify-center items-center mt-6">
            <label htmlFor="message" className="text-xl sm:text-2xl  m-2 ">
              Content :
            </label>
            <textarea
              id="message"
              rows="7"
              type="text"
              name="content"
              value={values.content}
              onBlur={handleBlur}
              onChange={handleChange}
              className="placeholder:text-black-500 placeholder:italic  mx-3 p-3 rounded-3xl w-3/4 md:w-1/4 border border-gray-300 shadow-sm text-black"
              placeholder="Write your thoughts here..."
            ></textarea>
            {errors.content && (
              <span className="text-red-800 font-bold">*{errors.content}</span>
            )}
          </div>

          <div className="w-full flex flex-col md:flex-row justify-center items-center mt-6">
            <label htmlFor="message" className="text-xl sm:text-2xl  m-2 ">
              Image :
            </label>

            <input
              className="block w-1/4 text-sm mx-5  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              name="image"
              onChange={handleFileChange}
            />
            {errors.image && (
              <span className="text-red-800 font-bold">*{errors.image}</span>
            )}
          </div>
          <button
            type="submit"
            name="Signup"
            className="w-3/4 md:w-1/4 mx-3 bg-blue-500 mt-10 p-3 text-white rounded-full hover:bg-blue-300"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
