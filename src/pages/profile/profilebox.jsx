import React from "react";
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";
  import {
    FacebookIcon,
    LinkedinIcon,
    WhatsappIcon,
    XIcon,
  } from "react-share";
//   import { InstagramEmbed } from 'react-social-media-embed';
const ProfileBox =({ userData , userImage })=>{
    const currentUrl = window.location.href;
    
    return(
        
        <div className="profbox">
            <div className="box1">
                <div className="detail">
                    <h3>Profile</h3>
                    <p>Type: {userData.type_of}</p>
                    <p>Name: {userData.patientFname} {userData.patientLname}</p>
                    <p>Email: {userData.email}</p>
                    <p>Phone: {userData.mobile}</p>
                    <p>Hospital: {userData.hospital}</p>
                </div>
                <div className="profphoto">
                    <div className="imgbox">
                        <img src={userImage} alt="" />

                    </div>
                    <h3>{userData.patientFname} {userData.patientLname}</h3>
                </div>
                <div className="donationstatus">
                    <h3>Payment Stats</h3>
                    <div className="payGraph">
                        <img src={require ("./profimgs/graph.png")} alt="" />
                    </div>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas, sapiente </p>
                </div>
            </div>
            <div className="box2">
                <div className="social">

                    <FacebookShareButton url={currentUrl}>
                    <div className="socialimgs" id="fb">
                        <FacebookIcon round size={45}></FacebookIcon>
                        <h3>Share on Facebook</h3>
                    </div></FacebookShareButton>
                    
                    <TwitterShareButton url={currentUrl}>
                    <div className="socialimgs" id="X">
                        {/* <img src={require ("../../logos/xfoot.jpg")} alt="" /> */}
                        {/* <TwitterIcon round size={45}/> */}
                        <XIcon round size={45}/>
                        <h3>Share on X</h3>
                    </div></TwitterShareButton>

                    <LinkedinShareButton url={currentUrl}>
                    <div className="socialimgs" id="linked">
                        {/* <img src={require ("../../logos/linkedfoot.png")} alt="" /> */}
                        <LinkedinIcon round size={45}/>
                        <h3>Share on LinkedIn</h3>
                    </div></LinkedinShareButton>

                    <WhatsappShareButton url={currentUrl}>
                        <div className="socialimgs" id="whatsapp">
                            <WhatsappIcon round size={45}/>
                            <h3>Share on WhatsApp</h3>
                        </div>
                    </WhatsappShareButton>
                </div>
                <div className="payment">
                    <div className="payimg">
                        <img src={require ("./profimgs/upi.png")} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileBox