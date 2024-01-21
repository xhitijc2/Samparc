import React from "react";
const Story =({ userData })=>{
    return(
        <div className="story">
            <h3>Story</h3>
            <div className="content">
                <p>{userData.story}</p>
            </div>
        </div>
    )
}
export default Story
