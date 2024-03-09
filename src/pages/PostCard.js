import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
const PostCard = ({ post }) => {
  return (
    <>
      <div className="max-w-sm shadow-purple-900 hover:shadow-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4 h-3/4">
        <img
          className="rounded-t-lg object-cover w-full h-full"
          src={post.image}
          alt=""
        />

        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            "{post.title}"
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {post.content.length > 200
              ? `${post.content.substring(0, 200)}...`
              : post.content}
          </p>
          <NavLink
            to={`/posts/${post._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default PostCard;
