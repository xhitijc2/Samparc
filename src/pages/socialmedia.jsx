import React from "react";

const SocialMedia = ()=>{
    return(
    <div className="socialmedia">
        <div className="socialimgs">
            <img src={require ("../logos/linkedfoot.png")} alt="" />
            {/* <img src={require ("../logos/facefoot.jpg")} alt="" /> */}
            <img src={require ("../logos/youtubefoot.png")} alt="" />
            <img src={require ("../logos/xfoot.jpg")} alt="" />
            <img src={require ("../logos/instafoot.png")} alt="" />
            <img src={require ("../logos/whatsfoot.png")} alt="" />
        </div>

        <div className="queries">
            <h4>For Any Queries</h4>
            <h5>Email: info@samparc.org</h5>
            <h5>Contact No:</h5>
            <h5>+917879291771</h5>

        </div>
    </div>
        
    )
}

export default SocialMedia;