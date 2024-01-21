import React from "react";
import "./profileStyle.scss";

const ProfileTitle = ({ userData, userImage }) => {
  return (
    <div className="profTitle">
      <div className="namebox">
        <div className="profimg">
          {/* Use the userImage data to set the image source */}
          <img src={userImage} alt="" />
        </div>
        <h1 className="username">{userData.patientFname} {userData.patientLname}</h1>
        <div className="logo">
          <img src={require("../images/darkGreen-removebg-preview.png")} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ProfileTitle;
