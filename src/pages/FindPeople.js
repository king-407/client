import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../Reducers/userReducer";
import PeopleCard from "./PeopleCard";
import { useNavigate } from "react-router-dom";

const FindPeople = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  const { users, loading } = useSelector((state) => state.activity);
  const { loggedInUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (loggedInUser == null) {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  if (loading) {
    return <h1>loading</h1>;
  }
  return (
    <div class="min-h-screen bg-gray-700  pt-12">
      <div className="flex flex-col sm:flex-row flex-wrap space-y-2 justify-center items-center mt-4 mb-5  ">
        {users.length > 0 &&
          users.map((user, index) => (
            <PeopleCard key={index} user={user} loggedIn={loggedInUser} />
          ))}
      </div>
    </div>
  );
};

export default FindPeople;
