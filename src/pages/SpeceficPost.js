import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPostById } from "../Reducers/postReducer";
import { useNavigate, useParams } from "react-router-dom";
import { getAllComments, writeComment } from "../Reducers/CommentReducer";
import { toast } from "react-toastify";
import Comment from "./Comment";
import { logout } from "../Reducers/authReducer";

const SpeceficPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [baat, setBaat] = useState("");
  const [clicked, setClicked] = useState(0);
  const { postId } = useParams();

  const { loggedInUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (loggedInUser == null) {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  useEffect(() => {
    dispatch(getPostById(postId));
  }, []);

  const { achieved, commentMessage, loading } = useSelector(
    (state) => state.comments
  );

  useEffect(() => {
    dispatch(getAllComments(postId));
  }, []);

  const { singlePost } = useSelector((state) => state.posts);

  const { comments } = useSelector((state) => state.comments);

  const handleInputChange = (event) => {
    setBaat(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { comment: baat, postId };
    dispatch(writeComment(data)).then(() => {
      dispatch(getAllComments(data.postId));
    });
    setClicked(clicked + 1);
    setBaat("");
  };

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
      <main className="max-w-4xl mx-auto">
        <section className="flex flex-col justify-center w-full p-4">
          <div className="heading font-extrabold italic text-white mt-8 text-3xl sm:text-4xl">
            " {singlePost?.title} "
          </div>

          <div className="image-section flex flex-row mt-5">
            <img
              src={singlePost.user?.image}
              className=" w-1/12 rounded-full"
            />

            <div className="mx-4">{singlePost.user?.user_name}</div>
          </div>
          <div className="image mt-5 flex justify-center ">
            <img src={singlePost?.image} className="w-3/4 " />
          </div>

          <div className="mt-7 p-5 ">
            <p className="mb-5 text-600 sm:text-xl leading-10 hover">
              {singlePost?.content}
            </p>
          </div>
        </section>
      </main>

      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion
            </h2>
          </div>
          <form className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label for="comment" className="sr-only">
                Your comment
              </label>

              <textarea
                id="comment"
                rows="6"
                value={baat}
                onChange={handleInputChange}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              name="commentBox"
              onClick={handleSubmit}
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 bg-blue-500"
            >
              Post comment
            </button>
          </form>
          {comments.length > 0 &&
            comments.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default SpeceficPost;
