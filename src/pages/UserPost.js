import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserPost } from "../Reducers/postReducer";
import PostCard from "./PostCard";
import { logout } from "../Reducers/authReducer";
const UserPost = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllUserPost(userId));
  }, []);

  useEffect(() => {
    if (loggedInUser == null) {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  const signOut = () => {
    dispatch(logout());
  };
  const { userPosts } = useSelector((state) => state.posts);
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
      <section className="max-w-4xl mx-auto">
        <div className=" flex flex-col md:flex-row items-center justify-center flex-wrap">
          {userPosts.length === 0 ? (
            // If userPosts array is empty, render "no user found" message
            <p className="text-white font-medium text-3xl mt-6">
              No post has been added by the user
            </p>
          ) : (
            // If userPosts array is not empty, render PostCard components
            userPosts.map((post, index) => <PostCard key={index} post={post} />)
          )}
        </div>
      </section>
    </div>
  );
};

export default UserPost;
