import React from "react";
import { useNavigate } from "react-router-dom";
const PostCard = ({ post }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-4 mb-5 bg-slate-800 rounded-2xl  w-4/5 shadow-xl flex flex-col justify-center p-6">
        <div className="flex flex-row w-full sm:w-1/2">
          <img className=" w-1/12 h-1/12 rounded-full" src={post.user.image} />
          <div className="mx-2">{post.user.user_name}</div>
        </div>

        <div className="mt-4 font-extrabold text-xl  italic">
          " {post.title} "
        </div>

        <div className="mt-6 font-medium">
          {" "}
          {post.content.length > 200
            ? `${post.content.substring(0, 200)}...`
            : post.content}
        </div>
        <div className="flex flex-row justify-end">
          <img src={post.image} className=" mx-5 w-1/4" />
        </div>
        <button
          className="w-1/2 p-3 rounded-2xl bg-teal-500"
          onClick={() => {
            navigate(`/posts/${post._id}`);
          }}
        >
          View Post
        </button>
      </div>
      <hr className="w-full flex flex-row justify-center" />
    </>
  );
};

export default PostCard;
