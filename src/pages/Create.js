import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../Reducers/postReducer";
import { ToastContainer, toast } from "react-toastify";
const initialValues = {
  content: "",
  title: "",
  category: "",

  image: null,
};
const Create = () => {
  const [clicked, setClicked] = useState(0);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { postMessage, achieved, loading } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (achieved != null && achieved == false && loading === false)
      toast.error(postMessage);
    else if (achieved != null && achieved == true && loading === false) {
      toast.success(postMessage);
    }
  }, [loading]);

  const { values, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValues,

      onSubmit: (values) => {
        dispatch(createPost(values));
        setClicked(clicked + 1);
      },
    });

  const handleFileChange = (event) => {
    setFieldValue("image", event.currentTarget.files[0]);
  };

  return (
    <div class=" min-h-screen bg-black text-white">
      <div class="bg-teal-700 text-white top-0">
        <section class="flex items-center justify-between max-w-4xl mx-auto p-1">
          <h1 class="text-3xl font-medium p-3">🚀 Large</h1>
          <NavLink to="/create" className="text-400">
            Create
          </NavLink>
          <div class="mx-4">
            <button
              id="mobile-open-button"
              class="text-3xl sm:hidden focus:outline-none"
            >
              &#9776;
            </button>
          </div>
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
          </div>

          <div className="w-full flex flex-col md:flex-row justify-center items-center mt-6">
            <label for="message" class="text-xl sm:text-2xl  m-2 ">
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
              class="placeholder:text-black-500 placeholder:italic  mx-3 p-3 rounded-3xl w-3/4 md:w-1/4 border border-gray-300 shadow-sm text-black"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-center items-center mt-6">
            <label for="message" class="text-xl sm:text-2xl  m-2 ">
              Image :
            </label>

            <input
              class="block w-1/4 text-sm mx-5  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              name="image"
              onChange={handleFileChange}
            />
          </div>
          <button
            type="submit"
            name="Signup"
            className="w-3/4 md:w-1/4 mx-3 bg-blue-500 mt-10 p-3 text-white rounded-full hover:bg-blue-300"
          >
            Post
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Create;
