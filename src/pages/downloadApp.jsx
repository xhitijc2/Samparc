import React from "react";

const DownloadApp = ()=>{
    return(
        <div className="downloadApp">
            <h1>Download the App</h1>
            <img src= {require ("../logos/playstore.png")} alt="" />
            <img src={require ("../logos/appstore.png")}alt="" />
        </div>
        
    )
}

export default DownloadApp;