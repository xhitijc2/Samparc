import React from "react";
import Form from "./form";
import {Link} from "react-router-dom";

const Title = ()=>{
    return(
        <div className="title">
            <img className="titlebg" src={require ("./images/darkGreen-removebg-preview.png")} alt="" />
                
            
            <div className="patient">
                <div className="patientbox">
                <img className="patientname" src=
                {require ("./images/patient.png")} alt="" />
                </div>
                </div>
            <div className="mid">
                <h2>Empower Humanity</h2>
                <h2>With</h2>
                <img src={require("./images/darkGreen-removebg-preview.png")} alt="" />
                
                <Link to="/register">
      <button>Start A FREE Fundraiser Now</button>
                </Link>
                <Link to="/login">
      <button>Or Login Into Existing One</button>
                </Link>
                
                
            </div>
            <div className="logo">
                <img src={require("./images/darkGreen-removebg-preview.png")} alt="" />
            </div>
        </div>
        
    )
}

export default Title;