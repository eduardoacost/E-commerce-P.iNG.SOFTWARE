import React from "react";
import "./Hero.scss"
import slider from "../Assets/slider.png"
const Hero = () =>{
    return(
    <div className="hero">
        <div className="slider">
            <img src={slider} alt="" />
        </div>
    </div>
    )
}

export default Hero