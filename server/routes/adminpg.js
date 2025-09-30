const express = require('express');
const  pool = require('../db');
const router = express.Router();
const nodemailer = require("nodemailer");
require('dotenv').config();


//post password 

router.post('/login', (req, res) => {
    try {
        const {admin_name , admin_password} = req.body;

        if(admin_password ===  process.env.ADMIN_SECRET){
            res.cookie("isAdmin", true, { httpOnly: true });
            res.status(201).json({
                success : true,
                message : "Admin Login SuccessFully"
            })
        }
        else{
            res.status(401).json({ success: false, message: "Unauthorized" });
        }

        //"isAdmin" → the key (cookie name).
        //true -> setting value 
        //hhtpOnly -> to make secure
        
    } catch (error) {
        console.error(error.message);
        
    }
})





//middleware to check cookies

function checkAdmin(req, res, next) { // Think of this function as a door guard at the entrance to a special room (the Admin page).
  if (req.cookies.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized" });
  }

  //req -> browser sent data to server, res -> server sent data to browser, next -> thumbs up to proceed
  //req.cookies -> is where Express keeps the cookies the browser sent. req.cookies.isAdmin -> server knows user is logged as admin.
  //next -> proceed to next step.
  //403 -> Forbidden status — this is like saying “No entry. You’re not allowed here.”

}




router.get('/dashboard', (req,res) => {
    try {
        const {contact_id, contact_name, contact_number, contact_email, contact_feedback, status,  created_at} = req.body;
        
    } catch (error) {
        console.error(error.message);
        
    }
})




router.get('/dashboard/:contact_id', (req,res) => {
    try {
        const {contact_id, contact_name, contact_number, contact_email, contact_feedback, status,  created_at} = req.body;
        
    } catch (error) {
        console.error(error.message);
        
    }
})

const transporter = nodemailer.createTransport({
  service: "gmail", // you can also use outlook, yahoo etc.
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS,   // use App Password (not real Gmail password!)
  },
});


router.put('/dashboard/:contact_id', async(req, res) => {
    try {
        const {contact_id } = req.params;
        const {contact_email, contact_name} = req.body;

        const response = await pool.query("UPDATE contact SET status = 'resolved' WHERE contact_id = $1 RETURNING *", [contact_id]);
        console.log(response.rows[0]);

        await transporter.sendMail({
            from: `"Sakura Bites" <${process.env.EMAIL_USER}>`,
            to: contact_email, // send to user
            subject: "Thank You For Connecting!",
            text: `Hello ${contact_name}. We Have Resolved Your Issue , Kindly Connect With Us Once Again.`,
        });
        
        res.status(200).json({
            success: true,
            message: "Contact resolved and email sent",
            updatedContact: response.rows[0],
        });
        
    } catch (error) {
        console.error(error.message);
        
    }
})



module.exports = router; 