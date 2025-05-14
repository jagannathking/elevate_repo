import React from "react";

const UserProfile = ({ userData }) => {

  return (
    <div className="profile-container">
      <div>
        <img src={userData.avatarUrl} alt={userData.name} />
      </div>
      <div>
        <p>Name : {userData.name}</p>
        <p>Email : {userData.email}</p>
        <p>Bio : {userData.bio}</p>
      </div>
    </div>
  );
};

export default UserProfile;
