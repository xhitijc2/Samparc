import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import "../style.scss"
// import "../index.css"
// import api from '../api'
import axios from "axios";
import { signInWithPhoneNumber, RecaptchaVerifier, getAuth } from "firebase/auth";
import 'react-phone-input-2/lib/style.css';



const Form = () => {
  const navigate = useNavigate();
  const [typeOf, setTypeOf] = useState("");
  const [patientFname, setPatientFname] = useState("");
  const [patientLname, setPatientLname] = useState("");
  const [campaigner, setCampaigner] = useState("");
  const [email, setEmail] = useState("");
  const [hospital, setHospital] = useState("");
  const [amount, setAmount] = useState(0);
  const [aadharnumber, setAadharNumber] = useState("");
  const [story, setStory] = useState("");
  const [disease, setDisease] = useState("");
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [number, setnumber] = useState("")
  const [oTPCode, setOTPCode] = useState("")
  const [isOtpVerified, setIsOtpVerified] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [emailError, setEmailError] = useState("");
  const [aadharNumberError, setAadharNumberError] = useState("");
  const [isAAdhar, setisaadhar] = useState(false);
  const [patientFnameError, setPatientFnameError] = useState("");
  const [isFirstName, setisFirstName] = useState(false);
  const [lastnameerror, setlastnameerror] = useState("");
  const [islastname, setislastname] = useState(false);
  const [campaignererror, setcampainererror] = useState("");
  const [iscampaigner, setiscampaigner] = useState(false);
  const [isemail, setisemail] = useState(false);
  const [hospitalerr, setHospitalerr] = useState("");
  const [ishospital, setishospital] = useState(false);
  const [goalerror, setgoalerr] = useState("");
  const [isgoal, setisgoal] = useState(false);
  const [diseaseerr, setDiseaseerr] = useState("");
  const [isdisease, setisdisease] = useState(false);
  const [typeErr, setTypeOferr] = useState("");
  const [istype, setistype] = useState(false);
  const [fileerr, setfileerr] = useState("");
  const [isfile, setisfile] = useState(false);

  const handleTypeOfChange = (e) => {
    const value = e.target.value;
    setTypeOf(value);
    if (!value.trim()) {
      setTypeOferr("Type is required");
    } else {
      setTypeOferr("");
      setistype(true);
    }
  };

  const handlePatientFnameChange = (e) => {
    const value = e.target.value;
    setPatientFname(value);
    if (!value.trim()) {
      setPatientFnameError("First name is required");
    } else {
      setPatientFnameError("");
      setisFirstName(true);
    } 
  };

  const handlePatientLnameChange = (e) => {
    const value = e.target.value;
    setPatientLname(value);
    if (!value.trim()) {
      setlastnameerror("Last name is required");
    } else {
      setlastnameerror("");
      setislastname(true);
    } 
  };

  const handleCampaignerChange = (e) => {
    const value = e.target.value;
    setCampaigner(value);
    if (!value.trim()) {
      setcampainererror("Campaigner name is required");
    } else {
      setcampainererror("");
      setiscampaigner(true);
    } 
  };

  const handleMobileChange = (e) => {
    setnumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if(!value.trim()){
      setEmailError("Email is required");
    }
    else{
      if (emailRegex.test(email)) {
        setEmailError(""); 
        setisemail(true);
      } else {
        setEmailError("Invalid email format");
      }
    }
    
  };

  const handleHospitalChange = (e) => {
    const value = e.target.value;
    setHospital(value);
    if (!value.trim()) {
      setHospitalerr("Hospital is required");
    } else {
      setHospitalerr("");
      setishospital(true);
    } 
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (!value.trim()) {
      setgoalerr("Amount is required");
    } else {
      setgoalerr("");
      setisgoal(true);
    } 
  };

  const AadharRegex = /^\d{12}$/;

  const handleAadharNumberChange = (e) => {
    
    const value = e.target.value;
    setAadharNumber(value);
    if(!value.trim()){
      setAadharNumberError("Aadhar number is required");
    }
    else{
      if (AadharRegex.test(value)) {
        setAadharNumberError(""); 
        setisaadhar(true);
      } else {
        setAadharNumberError("Aadhar Number should be 12 digits");
        setisaadhar(false);
      }
    }
  };

  const handleStoryChange = (e) => {
    setStory(e.target.value);
  };

  const handleDiseaseChange = (e) => {
    const value = e.target.value;
    setDisease(value);
    if (!value.trim()) {
      setDiseaseerr("Disease is required");
    } else {
      setDiseaseerr("");
      setisdisease(true);
    } 
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setFile(null);
      setfileerr("File is required");
      setisfile(false);
    } else if (selectedFile.size > 2 * 1024 * 1024) { // 2MB in bytes
      setFile(null);
      setfileerr("File size exceeds 2MB limit");
      setisfile(false);
    } else if(!selectedFile.type.startsWith('image/jpeg') && !selectedFile.type.startsWith('image/png')){
      setFile(null);
      setfileerr("Only JPEG and PNG files are allowed");
      setisfile(false);
    }
    else {
      setFile(selectedFile);
      setfileerr("");
      setisfile(true);
    }
  };

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
      alert("verified, proceed for registration")
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      alert("Sorry, there is some error: " + error.message)
      // ...
    });

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!istype){
      alert("Please select a type of Fundraiser");
      return;
    }
    if (!isOtpVerified) {
      alert("Please verify OTP first.");
      return;
    }
    
    if(!isFirstName || !islastname|| !iscampaigner || !isemail || !ishospital ||!isdisease || !isgoal || !isAAdhar || !isfile ){
      alert("Enter Required Fields");
      return;
    }
    const data = new FormData();
    data.append("type_of", typeOf);
    data.append("patientFname", patientFname);
    data.append("patientLname", patientLname);
    data.append("campaigner", campaigner);
    data.append("mobile", number);
    data.append("email", email);
    data.append("hospital", hospital);
    data.append("amount", amount);
    data.append("aadharnumber", aadharnumber);
    data.append("story", story);
    data.append("disease", disease);
    if (file !== undefined && file !== null) {
      data.append("file", file);
    } // Assuming "file" is the input field for the file

    try {
      const response = await axios.post("http://localhost:8000/users/", data, {
        headers: {
          "Content-Type": "multipart/form-data",  // Set content type to form data
        },
      });
      console.log(response.data);
      setSuccessMessage("Campaign created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.error("Error submitting form:", error.message);
      console.log(error.response.data);
    }
  };



  return (
    <div className="formbox">
      <div className="logo">
        <img src={require("./images/darkGreen-removebg-preview.png")} alt="" />
      </div>

      <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">

        <h1 className="formtitle">Start a Fundraiser</h1>

        <div className="Typeof">
          <label htmlFor="">Type of Fundraiser<span className="reqstar">*</span></label>
          <select value={typeOf} onChange={handleTypeOfChange}>
            <option value="">Select</option>
            <option value="Medical Fundraiser">Medical Fundraiser</option>
            <option value="Educational Fundraiser">Educational Fundraiser</option>
          </select>
          {typeErr && <p className="error-message">{typeErr}</p>}
        </div>

        <div className="forminput">

        <div className="firstname">
          <label htmlFor="patientFirstName">Patient First Name<span className="reqstar">*</span></label>
          <input
            type="text"
            id="patientFirstName"
            placeholder="Enter Patient's First Name"
            value={patientFname}
            required
            onChange={handlePatientFnameChange}
          />
          {patientFnameError && <p className="error-message">{patientFnameError}</p>}
        </div>

          <div className="lastname" >
            <label htmlFor="">Patient Last Name<span className="reqstar">*</span></label>
            <input type="text" placeholder="Enter Patient's Last Name" value={patientLname} onChange={handlePatientLnameChange} />
            {lastnameerror && <p className="error-message">{lastnameerror}</p>}
          </div>

          <div className="Campaignername">
            <label htmlFor="">Campaigner Name<span className="reqstar">*</span></label>
            <input type="text" placeholder="Enter Campaigner's Name" value={campaigner} onChange={handleCampaignerChange} />
            {campaignererror && <p className="error-message">{campaignererror}</p>}
          </div>

          <div className="mobile">
            <label htmlFor="">
            Mobile Number
            <span className="reqstar">*</span></label>
            {/* <PhoneInput className="phoneInput" defaultCountry="IN"
              value={number}
              onChange={setnumber}
              placeholder="Enter Phone number"></PhoneInput> */}
            
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
          </div>

          <div className="otp">
            <label htmlFor="">Verification Code<span className="reqstar">*</span></label>
            <input type="number" value={oTPCode} onChange={(e) => setOTPCode(e.target.value)} placeholder="Enter OTP" id="" />
            <button onClick={OnSubmitOtp} >Verify OTP</button>
          </div>

          <div className="email">
            <label htmlFor="">Email<span className="reqstar">*</span></label>
            <input type="email" placeholder="Enter Email Address" value={email} onChange={handleEmailChange} />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>

          <div className="hospital" >
            <label htmlFor="">Hospital<span className="reqstar">*</span></label>
            <input type="text" placeholder="Enter Hospital Name" value={hospital} onChange={handleHospitalChange} />
            {hospitalerr && <p className="error-message">{hospitalerr}</p>}
          </div>

          <div className="disease" >
            <label htmlFor="">Disease<span className="reqstar">*</span></label>
            <input type="text" placeholder="Enter Disease" value={disease} onChange={handleDiseaseChange} />
            {diseaseerr && <p className="error-message">{diseaseerr}</p>}
          </div>

          <div className="goalAmount">
            <label htmlFor="">Goal Amount<span className="reqstar">*</span></label>
            <input type="number" placeholder="Enter Amount" value={amount} onChange={handleAmountChange} />
            {goalerror && <p className="error-message">{goalerror}</p>}
          </div>

          <div className="aadharnum">
            <label htmlFor="">Aadhar Number<span className="reqstar">*</span></label>
            <input type="text" placeholder="Enter Aadhar Number" value={aadharnumber} onChange={handleAadharNumberChange} />
            {aadharNumberError && <p className="error-message">{aadharNumberError}</p>}
          </div>

          <div className="aadharfile">
            <label htmlFor="">Upload Image<span className="reqstar">*</span></label>
            <input type="file" accept=".jpeg, .jpg, .png" onChange={handleFileChange} />
            {fileerr && <p className="error-message">{fileerr}</p>}
          </div>

          <div className="story">
            <label htmlFor="">Write a Story</label>
            <textarea name="" id="" cols="30" rows="3" placeholder="Write your story" value={story} onChange={handleStoryChange}></textarea>
          </div>


        </div>
        <p className="note">Fields marked with asterisk(*) are required.</p>
        <button type="submit" onClick={handleSubmit}>Create Campaign</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  )

}

export default Form