import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
const PostCard = ({ post }) => {
  return (
    <>
      <div className="max-w-sm shadow-purple-900 hover:shadow-lg  border rounded-lg shadow bg-gray-800 border-gray-700 m-4 h-3/4">
        <img
          className="rounded-t-lg object-cover w-full h-full"
          src={post.image}
          alt=""
        />

        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            "{post.title}"
          </h5>

          <p className="mb-3 font-normal  text-gray-400">
            {post.content.length > 200
              ? `${post.content.substring(0, 200)}...`
              : post.content}
          </p>
          <NavLink
            to={`/posts/${post._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white  rounded-lg  focus:ring-4 focus:outline-none  bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Read more
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default PostCard;
