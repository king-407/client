import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../Reducers/userReducer";
import PeopleCard from "./PeopleCard";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
const FindPeople = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /// getting all the users ///
  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  //// getting all the users from the reducer
  const { users, loading } = useSelector((state) => state.activity);

  // checking the login or not //
  const { loggedInUser } = useSelector((state) => state.user);

  // if not login send back to the login screen //
  useEffect(() => {
    if (loggedInUser == null) {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  ///// displaying the spinner if loading ////
  if (loading) {
    return (
      <div className="min-h-screen h bg-black flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-700  pt-12">
      <div className="flex flex-col md:flex-row flex-wrap space-y-2 justify-center items-center mt-4 mb-5  ">
        {users.length > 0 &&
          users.map((user, index) => (
            <PeopleCard key={index} user={user} loggedIn={loggedInUser} />
          ))}
      </div>
    </div>
  );
};

export default FindPeople;
