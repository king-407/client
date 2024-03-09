import React from "react";
import { NavLink } from "react-router-dom";

const Tabs = () => {
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center justify-center mt-5">
      <li className="me-2">
        <NavLink
          exact
          to="/dashboard"
          activeClassName="active-tab"
          className="inline-block p-4 rounded-t-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-300 mx-5"
        >
          All Post
        </NavLink>
      </li>
      <li className="me-2">
        <NavLink
          exact
          to="/findpeople"
          activeClassName="active-tab"
          className="inline-block p-4 rounded-t-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-300 mx-5"
        >
          Your Post
        </NavLink>
      </li>
      <li className="me-2">
        <NavLink
          exact
          to="/create"
          activeClassName="active-tab"
          className="inline-block p-4 rounded-t-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-300 mx-5"
        >
          Discover People
        </NavLink>
      </li>
    </ul>
  );
};

export default Tabs;
