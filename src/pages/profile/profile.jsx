import React, { useEffect, useState } from "react";
import ProfileTitle from "./profiletitle";
import axios from "axios";
import KnowMore from "../knowMore";
import Slider from "./slider";
import Story from "./story";
import ProfileBox from "./profilebox";
import "./profileStyle.scss";
import slides from "./mock.json";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    // Fetch user data
    axios
      .get(`http://localhost:8000/users/${userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });

    // Fetch user images
    axios
      .get(`http://localhost:8000/users/${userId}/images`, { responseType: 'arraybuffer' })
      .then((response) => {
        const base64Image = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        setUserImage(`data:image/jpeg;base64,${base64Image}`);
      })
      .catch((error) => {
        console.error('Error fetching user images:', error);
      });
  }, [userId]);

  if (!userData || !userImage) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProfileTitle userData={userData} userImage={userImage}></ProfileTitle>
      <ProfileBox userData={userData} userImage={userImage}></ProfileBox>
      <Story userData={userData}></Story>
      <Slider slides={slides}></Slider>
      <KnowMore></KnowMore>
    </div>
  );
};

export default Profile;
