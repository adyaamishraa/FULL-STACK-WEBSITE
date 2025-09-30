const express = require('express');
const  pool = require('../db');
const router = express.Router();
const nodemailer = require("nodemailer");

require('dotenv').config();


const transporter = nodemailer.createTransport({
  service: "gmail", // you can also use outlook, yahoo etc.
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS,   // use App Password (not real Gmail password!)
  },
});




router.get('/', async(req, res) => {
    try {
        const response = await pool.query("SELECT * FROM contact");

        console.log(response.rows);

        res.status(200).json({
            "status" : "Getting all the contacts",
            "data" : response.rows
        })    
        
    } catch (error) {
        console.error(error.message);
         res.status(500).json({ error: error.message });
        
    }
})





router.post('/', async(req, res) => {
    try {
        const {contact_name, contact_number, contact_email, contact_feedback} = req.body; // recieved from frontend
        const response = await pool.query("INSERT INTO contact (contact_name, contact_number, contact_email, contact_feedback) VALUES ($1, $2, $3, $4) RETURNING *", [contact_name, contact_number, contact_email, contact_feedback]);
        console.log(response.rows[0]);

        await transporter.sendMail({
            from: `"Sakura Bites" <${process.env.EMAIL_USER}>`,
            to: contact_email, // send to user
            subject: "Thanks for your feedback!",
            text: `Hello ${contact_name}, thank you for your feedback: "${contact_feedback}." Will try to resolve the issue ASAP!`,
        });

        res.status(201).json({
            "status" : "Sucessfully Added New Contact",
            "message": "Feedback saved & email sent!",
            "data" : response.rows[0]
        })
        

    } 
    catch (error) {
        console.error("❌ Error inserting contact:", error.message);
        res.status(500).json({ error: error.message });
    }
})





router.put('/update/:contact_id', async(req, res) => {
    try {
        const {contact_id} = req.params;
        
        const response = await pool.query("UPDATE contact SET status='resolved' WHERE contact_id=$1 RETURNING *", [contact_id]);

        console.log(response.rows[0]);
        
        res.status(200).json({
            "status" : "SuccessFully Resolved!",
            "data" : response.rows[0]
        })
        
    } catch (error) {
        console.error("❌ Error inserting contact:", error.message);
        res.status(500).json({ error: error.message });
    }
})




module.exports = router; 