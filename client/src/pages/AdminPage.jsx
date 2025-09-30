import React, { useState } from 'react'
import AdminPg from '../assets/adminpg.jpg'
import { useNavigate } from 'react-router-dom'
import '../pages/AdminPage.css'

const AdminPage = () => {

  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const navigate = useNavigate(); 

  const sendAdminInfo = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:4000/adminpg/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // VERY IMPORTANT for cookies
        body: JSON.stringify({
          admin_name : adminName,
          admin_password : adminPassword
        }),
      });

      const data = await response.json();
      console.log(data);

      setAdminName("");
      setAdminPassword("");

      if(data.success){
        alert("Admin login successful!");
        navigate("/adminpage/dashboard");
      }
      else{
        alert("Something Went wrong!!");
      }
      

    } catch (error) {
      console.log("Error logging in!")
      alert("Error!! You are not authorised!!")

    }
  }


  return (
    <>
    <div className="admin-container">
      <img src={AdminPg} alt="bg" className='pagebg'/>

      <div className="center-div">
        
        <div className="admin-heading">
          <h1 className='head-h1'>Admin Page</h1>
          <p className='head-p'>Authorised Users can access...</p>
        </div>

        <form onSubmit={sendAdminInfo}>
          
          <div className='inp-lab'>
            <label htmlFor="name" className='labels'>Name</label>
            <input type="text" id='name' placeholder='Admin please enter name...' className='inputs' onChange={(e) => setAdminName(e.target.value)} value={adminName}/>
          </div>

            <br />

          <div className='inp-lab'>
            <label htmlFor="password" className='labels'>Password</label>
            <input type="password" id='password' className='inputs' placeholder='Admin please enter password...' onChange={(e) => setAdminPassword(e.target.value)} value={adminPassword}/>
          </div>
          

          <button type='submit'>Submit</button>
        </form>
      </div>

    </div>
    </>
  )
}

export default AdminPage