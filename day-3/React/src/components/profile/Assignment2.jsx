import React from "react";
import UserProfile from "./UserProfile";

const Assignment2 = () => {
  const userData = {
    name: "jagannath sethi",
    email: "jagannath@gmail.com",
    bio: "Fullstack developer with 5 years of experience building fullstack applications.",
    avatarUrl: "https://avatars.githubusercontent.com/u/119596644?v=4",
  };
  return <div>
    <UserProfile  userData = {userData}/>
  </div>;
};

export default Assignment2;
