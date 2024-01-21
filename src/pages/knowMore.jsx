import React from "react";
import SocialMedia from "./socialmedia";
import Columns from "./columns";
import DownloadApp from "./downloadApp";

const KnowMore = ()=>(
    <div className="knowMore">
        
        

        <div className="box">
        <SocialMedia></SocialMedia>
        <Columns >
        </Columns>
        <DownloadApp></DownloadApp>
        </div>
        

        <div className="copyright">
            <p>Copyright © 2023 Samparc Online Ventures Pvt Ltd. All Rights Reserved. Terms of Use | Privacy Policy | AML Policy | Use of cookies </p>
        </div>
    </div>

)

export default KnowMore;