import { useState} from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './Landing.css'
import landingImg from '../assets/landing.jpg'
import Logo from '../assets/logo.png'
import { Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { LiaClockSolid } from "react-icons/lia";
import { MdLocationPin } from "react-icons/md";
import { Animation } from '../anim-gsap/animation';
import Git from '../pages/Git'
import About from '../components/About'
import Contact from '../components/Contact'

const Landing = () => {

    const btnRef = useRef(null);
    const infoRef = useRef(null);
    const navRef = useRef(null);

    useEffect(() => {
    Animation(btnRef, infoRef, navRef); // Call the animation function here
    } , []);




    const aboutRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToAbout = () => {
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
     };

    const scrollToContact = () => {
        contactRef.current.scrollIntoView({ behavior: "smooth" });
    }

  return (
    <>
     <div className="container">
       
        <nav ref={navRef}>
          <div className="logo-div">
            <img src={Logo} alt="logo" />
          </div>

          <div className="nav-links" >
            <Git />
            <NavLink className="link" onClick={scrollToContact}>Contact</NavLink>
            <NavLink className="link" onClick={scrollToAbout}>About</NavLink>
            <NavLink to="/menu" className="link" >Menu</NavLink>
            <NavLink to="/adminpage" className="link">Admin Page</NavLink>
          </div>
        </nav>
{/* 
        <img src={landingImg} alt="landing page" to="/" /> */}


        <div className="info" ref={infoRef}>
          <span className='clock'><LiaClockSolid className='clock-icon'/> <span className='timing'>11:00 A.M to 10:00 P.M</span></span>
          <span className='location'><MdLocationPin className='location-icon'/> <span className="location-text">Indore</span></span>
        </div>

        <button className='btn' ref={btnRef}> Order Now </button>

      </div>

      

      <About ref={aboutRef}/>

      <Contact ref={contactRef}/>
    </>
  )
}

export default Landing