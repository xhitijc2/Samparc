import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { firebaseApp } from "./firebase"
import PhoneInput from 'react-phone-input-2';
import { signInWithPhoneNumber, RecaptchaVerifier, getAuth } from "firebase/auth";
import 'react-phone-input-2/lib/style.css';


const Login = () => {
  const navigate = useNavigate();
  const [number, setnumber] = useState("")
  const [oTPCode, setOTPCode] = useState("")
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const configureCaptch = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
        console.log("recaptcha verified")
      }
      // ,
      // defaultCountry:"IN"
    });

  }
  const onSignInSubmit = (e) => {
    e.preventDefault()
    configureCaptch();
    const phoneNumber = number;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;

    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        alert("otp sent");
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        // ...
        alert("Sorry, there is some error: " + error.message)

      });

  }

  const OnSubmitOtp = (e) => {
    e.preventDefault();
    const code = oTPCode;
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      setIsOtpVerified(true);
      alert("verified, proceed for login")
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      alert("Sorry, there is some error: " + error.message)
      // ...
    });

  }

  const encodeUserId = (userId) => {
    return btoa(userId); // Using base64 encoding for simplicity
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isOtpVerified) {
      alert("Please verify OTP first.");
      return;
    }


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
      navigate(`/landing/${encodeUserId(userId)}`);
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };
  return (
    <div className="loginbox">
      <div className="logo">
        <img src={require("./images/darkGreen-removebg-preview.png")} alt="" />
      </div>

      <div className="form">
        <h1 className="formtitle">Login</h1>
        <div className="mobile">
          <form  >
            <label htmlFor="">Mobile Number<span className="reqstar">*</span></label>
            <div id="sign-in-button"></div>
            {/* <PhoneInput defaultCountry="IN"
              value={number}
              onChange={setnumber}
              placeholder="enter phone number"></PhoneInput> */}
            <PhoneInput
                country={'in'}
                value={number}
                onChange={(value) => setnumber('+' + value)}
                inputProps={{
                  required: true,
                }}
            />  
            <div id="recaptcha-container"></div>
            <button onClick={onSignInSubmit}>Send Verification Code</button>
          </form>
        </div>
        <form encType="multipart/form-data" onSubmit={handleLogin}>
          <div className="otp">
            <label htmlFor="">Verification Code<span className="reqstar">*</span></label>
            <input type="number" value={oTPCode} onChange={(e) => setOTPCode(e.target.value)} placeholder="Enter OTP" id="" />
          </div>
          <button onClick={OnSubmitOtp} >Verify OTP</button>
          <button type="submit" >Login</button>
          <p>Don't have an account? <a href="http://">Register</a></p>
        </form>
      </div>
    </div>
  )
}
export default Login;