import React from 'react'
import '../pages/Thanks.css'
import {useNavigate} from 'react-router-dom'

const Thanks = () => {

    const navigate = useNavigate();

    const backToHome = () =>{
        navigate('/');
    }

  return (
    <>
    <div className='thanks' onClick={backToHome}>
        THANK-YOU
    </div>
    </>
  )
}

export default Thanks