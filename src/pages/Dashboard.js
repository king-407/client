import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllPosts } from "../Reducers/postReducer";

import PostCard from "./PostCard";
import Tabs from "./Tabs";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (loggedInUser == null) {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);
  const { posts } = useSelector((state) => state.posts);
  console.log(posts);
  return (
    <>
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

        {/* <section className="max-w-4xl mx-auto">
        <div className=" flex flex-col w-full sm:flex-row justify-center mt-10 sm:justify-start ">
          <div className="post-section w-3/4 sm:w-1/2 flex flex-col items-center">
            {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
          <div className=" w-1/2 sm:sticky sm:top-0 sm:h-full overflow-y-auto"></div>
        </div>
      </section> */}

        <Tabs />
        <section className="max-w-4xl mx-auto">
          <div className=" flex flex-col md:flex-row items-center justify-center flex-wrap">
            {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
