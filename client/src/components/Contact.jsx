import React, { forwardRef, useEffect, useState } from 'react'
import './Contact.css'
import ContactBg from '../assets/contactBg.jpg'

const Contact = forwardRef((props, ref) => {
   
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [descrip, setDesc] = useState("");

    
        const sendData = async (e) => {
            e.preventDefault(); // prevent page reload
            
            try {
                const response = await fetch("http://localhost:4000/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contact_name: name,
                        contact_number: phone,
                        contact_email: email,
                        contact_feedback: descrip
                    }),
                });

                const data = await response.json();
                console.log("Saved:", data);
                alert("Feedback submitted successfully!");

                setName("");
                setPhone("");
                setEmail("");
                setDesc("");

            } 
            catch (error) {
                console.error(error);
                alert("Error submitting feedback");

            }

        }

        
    

  return (
    <>
    <div className="contact-container" ref={ref}>
        <img src={ContactBg} alt="" />

        <form className="form" onSubmit={sendData}>
            
            <div className="row">
                <div>
                    <label htmlFor="name">Name :</label>
                    <input type="text" placeholder="Enter Name.." id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
   
                <div>
                    <label htmlFor="num">Phone Number :</label>
                    <input type="text" placeholder="Enter Phone number.." id="num" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                 </div>
            </div>

            <br />
            

            <label htmlFor="email">Email : </label>
            <input type="text" placeholder='Enter Email..' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>

            <br />
            

            <label htmlFor="text">Feedback : </label>
            <textarea rows={20} className='textarea' placeholder='Enter FeedBack..' id="text" value={descrip} onChange={(e) => setDesc(e.target.value)}></textarea>

            <button type="submit">Submit</button>
        </form>
    </div>
    </>
  )
});

export default Contact