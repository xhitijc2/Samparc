import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import 'react-phone-number-input/style.css';
import PhoneInput from "react-phone-number-input";
import { useUserAuth } from "./UserAuthContext"
import firebase from "./firebase"

const Login2= ()=>{
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const [number, setnumber] = useState("")
  const {setUpRecaptcha} = useUserAuth();

  const getOtp = async (e) => {
    e.preventDefault();
    if (number === "" || number === undefined) {
      alert('Please enter a valid mobile number');
      return;
    }

    try {
      const confirmationResult = await setUpRecaptcha(number);
      console.log("OTP sent successfully", confirmationResult);
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert('Error sending OTP: ${error.message}`');
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make an API request to log in and get the user ID
      const response = await fetch(`http://localhost:8000/users/by-phone/${number}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // Handle the case when the user is not found or the request fails
        console.error("Error logging in:", response.status);
        // You may want to show an error message to the user
        return;
      }

      const userId = await response.json(); // Assuming the response is directly the user ID

      // Redirect to the landing page with the retrieved user ID
      navigate(`/landing/${userId}`);
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };
    return(
        <div className="loginbox">
            <div className="logo">
            <img src={require("./images/darkGreen-removebg-preview.png")} alt="" />
            </div>
                
            <form className="form" encType="multipart/form-data" onSubmit={handleLogin}>
            <h1 className="formtitle">Login</h1>
            <div className="mobile">
                    <label htmlFor="">Mobile Number<span className="reqstar">*</span></label>
                    {/* <input type="text" placeholder="Enter Campaigner's Mobile Number" onChange={(e) => setMobile(e.target.value)} /> */}
                    <PhoneInput defaultCountry="PH" 
                    value = {number}
                    onChange={setnumber}
                    placeholder="enter phone number"></PhoneInput>
                    <div id="recaptcha-container"></div>

                    <button onClick={getOtp}>Send Verification Code</button>
            </div>

                <div className="otp">
                    <label htmlFor="">Verification Code<span className="reqstar">*</span></label>
                    <input type="number" placeholder="Enter OTP" name="" id="" />
                </div>

                <button type="submit" >Login</button>
                <p>Don't have an account? <a href="http://">Register</a></p>
            </form>
        </div>
    )
}
export default Login2;