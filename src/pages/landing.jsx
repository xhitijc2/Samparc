import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const Landing = () => {
  const { userId } = useParams();
  const linkRef = useRef(null);
  const [copiedMessage, setCopiedMessage] = useState(null);

  const handleCopyLink = () => {
    const linkText = linkRef.current.innerText;
    const tempInput = document.createElement("input");
    tempInput.value = linkText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    setCopiedMessage("Link copied!");
    setTimeout(() => setCopiedMessage(null), 3000);
  };

  const handleGoToProfile = () => {
    const profileLink = linkRef.current.innerText;
    window.open(profileLink, "_blank");
  };

  

  // const decodedUserId = atob(encodeUserId);
  return (
    <div className="landing">
      <div className="logo">
        <img src={require("./images/darkGreen-removebg-preview.png")} alt="" />
      </div>

      <div className="linkbox">
        <h1>Visit or Share Profile</h1>
        {/* <div className="idbox">
          <span>User ID:   </span>
          <span className="id">{`${userId}`}</span>
        </div> */}
        <div className="linkdiv">
          <span>User Profile link:  </span>
          <span ref={linkRef} className="link">{`http://localhost:3000/users/${userId}`}</span>
        </div>
        <div className="btns">
          <button onClick={handleCopyLink}>Copy Link</button>
          <button onClick={handleGoToProfile}>Go to Profile</button>
        </div>
        {copiedMessage && <p>{copiedMessage}</p>}
      </div>
    </div>
  );
};

export default Landing;
