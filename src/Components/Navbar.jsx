import React from "react";
import logo from '../images/navbar/infinityLogo.png'


export default function Navbar() {
    return (
        <div className="myNavbar">
            <img src={logo} className='img-fluid' alt="" />
        </div>
    )
}