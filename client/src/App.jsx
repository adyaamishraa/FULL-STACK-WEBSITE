import { useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import landingImg from './assets/landing.jpg'
import Logo from './assets/logo.png'
import { Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { LiaClockSolid } from "react-icons/lia";
import { MdLocationPin } from "react-icons/md";
import { Animation } from './anim-gsap/animation';
import Git from './pages/Git'
import About from './components/About'
import Contact from './components/Contact'
import AdminPage from './pages/AdminPage'
import Menu from './pages/Menu'
import Landing from './pages/Landing'
import HomePage from './pages/HomePage'
import AdminDash from './pages/AdminDash'
import Billing from './pages/Billing'
import Thanks from './pages/Thanks'

function App() {

      return(
        <>
        <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/menu" element={<Menu/>} />
        <Route path="/adminpage" element={<AdminPage/>} />
        <Route path="/adminpage/dashboard" element={<AdminDash />} />
        <Route path='/billing' element={<Billing/>} />
        <Route path='/thank-you' element={<Thanks/>} />
        </Routes>
        </>
      )
      
   

}

export default App
