import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllPosts } from "../Reducers/postReducer";

import PostCard from "./PostCard";
import Tabs from "./Tabs";
import Spinner from "./Spinner";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /// getting loggedin user ///
  const { loggedInUser } = useSelector((state) => state.user);

  /// checking if logged in or not ////
  useEffect(() => {
    if (loggedInUser == null) {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  /// fetching all post //
  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  //// hetting post from the reducer //
  const { posts, loading } = useSelector((state) => state.posts);

  if (loading) {
    return (
      <div className="min-h-screen h bg-black flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <div className=" min-h-screen bg-black text-white">
        <div className="bg-teal-700 text-white top-0">
          <section className="flex items-center justify-between max-w-4xl mx-auto p-1">
            <h1 className="text-3xl font-medium p-3">🚀 Large</h1>
            <NavLink to="/create" className="text-400">
              Create
            </NavLink>
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
        <Tabs />
        {/* Individual Post going to the card  */}
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
