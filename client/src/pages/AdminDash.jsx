import React, { useEffect, useState } from 'react'
import '../pages/AdminDash.css'
import { useNavigate } from 'react-router-dom'
import AdminBg from '../assets/admindashbg.jpg'
import { CiSearch } from "react-icons/ci";

const AdminDash = () => {
  
  const[contactInfo, setContactInfo] = useState([]); //ye array hai kyunki sari info isme set hogi
  const [showModal, setShowModal] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchById, setSearchById] = useState('');

  useEffect(() => {
    const addToTable = async() => {
      try {
        const response = await fetch('http://localhost:4000/contact');
        const data = await response.json();
        console.log(data.data);
        
        setContactInfo(data.data); 
        
      } catch (error) {
        console.error(error.message);
        
      }
    }
    addToTable();
  }, [])


 


  const btnClick = (contact) => {
    setSelectedContact(contact);
    setSelectedContactId(contact.contact_id);


    console.log("Selected Contact:", contact);
    

    if(contact.status == 'pending'){
      setShowModal(true);
    }
  }



  const resolveContact = async() => {
    try {
      const response = await fetch(`http://localhost:4000/adminpg/dashboard/${selectedContactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contact_id: selectedContact.contact_id,
          contact_name: selectedContact.contact_name,
          contact_email: selectedContact.contact_email
        })
      })

      console.log("SuccessFully Updated");

      setShowModal(false);

      window.location.reload();
      
      
    } catch (error) {
      console.error(error.message);
      
    }
  }
  
  
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/')
  }
  


  return (
    <>
    <div className="admindash-container">
      {/* <img src={AdminBg} alt="bg" /> */}



      <nav className="heading">

        
        <h1 className='dash-heading'>DashBoard</h1>

        <button className="log-out" onClick={goToHome}>
          Log-Out
        </button>
        

        <div className='search-date'>
          <div className="search">
            <CiSearch className='search-icon'/> 
            <input type="search" placeholder='search by id' className='search-input' value={searchById} onChange={(e) => setSearchById(e.target.value)}/>
          </div>

          <input type="date" placeholder='Date' className='date-bar'/>
        </div>

      </nav>


    <div className="table-container">

      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Ph. Number</th>
            <th scope="col">E-mail</th>
            <th scope="col">Feedback</th>
            <th scope="col">Status</th>
            <th scope="col">Date</th>
          </tr>
        </thead>

        <tbody>
          {contactInfo
          .filter((contact) => (
            searchById === " " ? true : contact.contact_id.toString().includes(searchById)  // true mtlb sare show hoge
          )) 
          .map((contact) => (
          <tr key={contact.contact_id}>
            <th scope="row">{contact.contact_id}</th>
            <td>{contact.contact_name}</td>
            <td>{contact.contact_number}</td>
            <td>{contact.contact_email}</td>
            <td>{contact.contact_feedback}</td>
            <td className='text-center align-middle'><button className={`status-btn ${contact.status}`} onClick={() => btnClick(contact)}>{contact.status}</button></td>
            <td>{contact.created_at}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Modal */}
     {
        showModal && (
          <div className='resolve-overlay'>
            <div className='resolve-container'>

              <div className='textDiv'>
                <h3 className='heading'>Resolving This Contact {selectedContactId}</h3>
                <span className='text'>Are You sure You want to resolve? This will get deleted from list!</span>
              </div>

              <div className='confirmationDiv'>
                <button className="cancelbtn" onClick={(e) => setShowModal(false)}>Cancel</button>
                <button className="acceptbtn" onClick={resolveContact}>Accept</button>
              </div>

            </div>
          </div>
        )
     }


    </div>
    </>
  )
}

export default AdminDash