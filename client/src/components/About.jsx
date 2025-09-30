import React, { forwardRef, useEffect, useRef } from 'react'
import bgabout from '../assets/about-bg.jpg';
import './About.css'
import img from'../assets/abt-img.jpg'

const About = forwardRef((props, ref) => {

  return (
    <>
    <div className="about-container" ref={ref}>
        <img src={bgabout} alt="bg-about" className='bgabout' />
        
        <div className="pic-text">
           <img src={img} alt="img" className='picture'/>
           <div className="text">About US: <br />  <br />Welcome to SAKURA BITES, where culinary passion meets unforgettable flavors. We serve freshly prepared dishes crafted from the finest ingredients, blending tradition with modern taste. Our warm, inviting atmosphere is perfect for family meals, friends’ gatherings, or special celebrations. Come savor delightful meals, enjoy exceptional service, and experience a dining journey that keeps you coming back for more.</div>
        </div>
    </div>
    </>
  )
});

export default About