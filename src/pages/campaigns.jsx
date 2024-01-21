import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Campaigns = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        autoplay:true
    };

    return (
        <div className="campaigns">
            <div className="campaigntitle">
                <h3>Active Campaigns</h3>
            </div>
            <div className="bigContainer">
                <div className="slider">
                    <Slider {...settings} className="myslider">
                        {data.map((d, index) => (
                            <div key={index} className="aCard">
                                <div className="imgbox">
                                    <img className="cardimg" src={d.img} alt="" />
                                </div>
                                <div className="cardtext">
                                    <p>{d.name}</p>
                                    <p>{d.time}</p>
                                    <h4>5 days left</h4>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

const data = [
    {
        name: `Hon`,
        img: './images/1.png',
        time: `lorem ipsum20`
    },
    {
        name: `Hon`,
        img: './images/2.png',
        time: `lorem ipsum20`
    },
    {
        name: `Hon`,
        img: './images/1.png',
        time: `lorem ipsum20`
    },
    {
        name: `Hon`,
        img: './images/2.png',
        time: `lorem ipsum20`
    },
    {
        name: `Hon`,
        img: './images/1.png',
        time: `lorem ipsum20`
    },
    {
        name: `Hon`,
        img: './images/2.png',
        time: `lorem ipsum20`
    },
    {
        name: `Hon`,
        img: './images/1.png',
        time: `lorem ipsum20`
    },
    {
        name: `Hon`,
        img: './images/2.png',
        time: `lorem ipsum20`
    }
];

export default Campaigns;
