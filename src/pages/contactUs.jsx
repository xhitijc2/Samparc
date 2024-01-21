import React from "react";


const ContactUs = ()=>{
    return(
        <div className="contactus">
            <img className="titlebg" src={require ("./images/darkGreen-removebg-preview.png")} alt="" />

            <div className="touch">
                <div className="touchcard">
                    <h2>Get In Touch With Us</h2>
                    <p>We know you need funds for treatment</p>
                    <p>Our team is here to you</p>
                    <button>Click Here To Contact Us</button>
                </div>
            </div>
            <div className="outmoney">
                <div className="outtext">
                    <h2>Out of Money for Medical Treatment?</h2>
                    <h3>Wondering how to fund your healing journey?</h3>
                    <h2>Your solution is just a click away.</h2>
                </div>
                <img src={require ("./images/worry.png")} alt="" />
            </div>
        </div>
        
    )
}

export default ContactUs;