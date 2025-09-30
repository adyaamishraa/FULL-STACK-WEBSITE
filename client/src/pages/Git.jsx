import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Git.css'
import { useNavigate } from "react-router-dom";


const Git = () => {

  const [showModal, setShowModal] = useState(false);

  const modal = () => {
    setShowModal(true);
  }

  const gitaccount = () => {
    setShowModal(false);
    window.open("https://github.com/adyaamishraa?tab=repositories", "_blank"); 
  }
  

  return (
    <>
    <div className="git-container">

    <span className="link" onClick={modal}>Github</span>

    {
        showModal && (
            <div className="modal-overlay">
            <div className="modal-container">
              
                <div>
                  <strong className='heading-modal'>Confirm if you want to continue!</strong>
                  <p className='p-modal'>Click Accept if want to view repositories.</p>
                </div>

                <div className="confirmation">
                  <button className="cancel-btn" onClick={(e) => setShowModal(false)} >Cancel</button>
                  <button className="accept-btn" onClick={gitaccount}>Accept</button>
                </div>
              
            </div>
            </div>
        )
    }

    </div>

    </>
  )
}

export default Git