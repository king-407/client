import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPostById } from "../Reducers/postReducer";
import { useParams } from "react-router-dom";

const SpeceficPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostById(postId));
  }, []);
  const { singlePost } = useSelector((state) => state.posts);

  return (
    <div className=" min-h-screen bg-black text-white">
      <div className="bg-teal-700 text-white top-0">
        <section className="flex items-center justify-between max-w-4xl mx-auto p-1">
          <h1 className="text-3xl font-medium p-3">🚀 Large</h1>
          <div className="mx-4">
            <button
              id="mobile-open-button"
              className="text-3xl sm:hidden focus:outline-none"
            >
              &#9776;
            </button>
          </div>
        </section>
      </div>
      <main className="max-w-4xl mx-auto">
        <section className="flex flex-col justify-center w-full p-4">
          <div className="heading font-extrabold italic text-white mt-8 text-3xl sm:text-4xl">
            " {singlePost.title} "
          </div>

          <div className="image-section flex flex-row mt-5">
            <img src={singlePost.user.image} className=" w-1/12 rounded-full" />

            <div className="mx-4">{singlePost.user.user_name}</div>
          </div>
          <div className="image mt-5 flex justify-center ">
            <img src={singlePost.image} className="w-1/2 " />
          </div>

          <div className="mt-7 p-5">
            <p className="mb-5 text-600 sm:text-xl leading-9">
              {singlePost.content}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SpeceficPost;
