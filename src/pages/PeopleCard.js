import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, getAllUser } from "../Reducers/userReducer";
import { useNavigate } from "react-router-dom";

const PeopleCard = ({ user, loggedIn }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const seePost = () => {
    nav(`/user/post/${user._id}`);
  };
  return (
    <div className="w-3/4 sm:w-1/4 p-4  bg-gray-900 rounded-3xl overflow-hidden hover: mx-5 mb-7 box-border ">
      <div className="border-b px-4 pb-6">
        <div className="text-center my-4">
          <img
            className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
            src={user?.image}
            alt=""
          />
          <div className="py-2">
            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
              {user?.name}
            </h3>
            <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
              <svg
                className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  className=""
                  d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                />
              </svg>
              {user?.user_name}
            </div>
          </div>
        </div>
        <div className="flex gap-2 px-2">
          {user &&
          user.followers &&
          user.followers.some(
            (follower) => follower._id === loggedIn.user._id
          ) ? (
            <button
              className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold px-4 py-2"
              disabled={true}
            >
              Following
            </button>
          ) : (
            <button
              className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold  hover:bg-blue-800 dark:hover:bg-blue-900  px-4 py-2"
              type="submit"
              onClick={() => {
                const data = { personId: user?._id };
                dispatch(followUser(data)).then(() => {
                  dispatch(getAllUser());
                });
              }}
            >
              Follow
            </button>
          )}
          <button
            className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2"
            onClick={seePost}
          >
            See Posts
          </button>
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
          <svg
            className="h-6 w-6 text-gray-600 dark:text-gray-400"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              className=""
              d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
            />
          </svg>
          <span>
            {user?.followers.length > 1 ? (
              <strong className="text-black dark:text-white">
                {user?.followers.length} Followers
              </strong>
            ) : (
              <strong className="text-white">
                {user?.followers.length} Follower
              </strong>
            )}
          </span>
        </div>
        <div className="flex">
          <div className="flex justify-end mr-2">
            {user?.followers.slice(0, 4).map((post, index) => (
              <img
                className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                src={post.image}
                alt=""
              />
            ))}

            {user?.followers.length > 4 && (
              <span className="flex items-center justify-center bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white font-semibold border-2 border-gray-200 dark:border-gray-700 rounded-full h-10 w-10">
                +{user?.followers.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleCard;
