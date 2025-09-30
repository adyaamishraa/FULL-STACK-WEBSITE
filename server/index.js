console.log("🚀 Server file started...");

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');
const contact = require('./routes/contact');
const adminpg = require('./routes/adminpg');
const menu = require('./routes/menu')





const app = express(); //usage of express

const PORT = 4000;


dotenv.config(); // load .env first



app.use(cors({
    origin: process.env.FRONTEND_URL, // your frontend URL
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true,               // allow cookies
}));
app.use(express.json()); //middleware to parse JSON bodies



const cookieParser = require("cookie-parser");
app.use(cookieParser());









app.get( '/' , (req, res) => {
    res.send('Hello World!');
})


//Saari Categories nikal ke dena hai
app.get('/categories', async(req,res) => {
    try {
        const response = await pool.query("SELECT * FROM categories");

        res.status(200).json({
            "status": "success",
            "results": response.rows.length,
            "data" : {
                "categories": response.rows
            }
        });

    } catch (error) {
        console.error(error.message);
        
    }
})


//Saari Dishes nikal ke dena hai
app.get('/dishes', async(req,res) => {
    try {
        const response = await pool.query("SELECT * FROM dishes");

        res.status(200).json({
            "status": "success",
            "results": response.rows.length,
            "data" : {
                "dishes": response.rows
            }
        });
        
    } catch (error) {
        console.error(error.message);
        
    }
})



//Dishes by Category ID nikal ke dena hai
app.get('/dishes/category/:categoryid', async(req,res) => {
    try {

        const {categoryid} = req.params;

        console.log("👉 Requested category:", categoryid);

        const response  = await pool.query("SELECT * FROM dishes WHERE category_id = $1", [categoryid]);

        res.status(200).json({
            "status": "success",
            "result_rows" : response.rows.length,
            "data" : {
                "dishes" : response.rows
            }
        });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
        
    }
})





//partiular dish by dish_id nikal ke dena hai
app.get('/dish/:dish_id', async(req, res) => {
    try {
        const {dish_id} = req.params;

        const response = await pool.query("SELECT * FROM dishes WHERE dish_id = $1", [dish_id]);

        console.log(`Requested Dish by dish_id ${dish_id} : `, response.rows[0]);

        res.status(200).json({
            "Mission" : "Fetched Requested Dish Successfully!!",
            "data" : {
                "dish": response.rows[0]
            }
        })
          
    } catch (error) {
        console.error(error.message);
        
    }
})






//Nayi category add karni hai
app.post('/categories', async(req, res) => {
    try {
        const {category_name} = req.body;
        console.log("👉 New Category :", category_name); // ye frontend se aaya h
        
        const response = await pool.query("INSERT INTO categories (category_name) VALUES ($1) RETURNING *", [category_name]);
        console.log(response.rows[0]); // ye database se aaya h

        res.status(201).json({
            "Misson" : "Category Successfully added!!",
            "data" : {
                "category": response.rows[0]
            }
        });

    } catch (error) {
        console.error(error.message);
        
    }
})


//Nayi dish add karni hai
app.post('/dishes', async(req,res) => {
    try {
        const {dish_name, price, description, category_id} = req.body;
        console.log("👉 New Dish : ", dish_name, price, description, category_id );
        
        const response = await pool.query("INSERT INTO dishes (dish_name, price, description, category_id) VALUES ($1, $2, $3, $4) RETURNING *", 
        [dish_name, price, description, category_id]);

        console.log(response.rows[0]);

        res.status(201).json({
            "Misson" : "Dish Successfully added!!",
            "data" : {
                "dish": response.rows[0]
            }
        });
        
    } catch (error) {
        console.error(error.message);
        
    }
})




//Dish update karni hai based on dish_id
app.put('/dishes/:dish_id', async(req,res) => {
    try {
        const {dish_id} = req.params;
        const { dish_name, price, description} = req.body;
        const response = await pool.query("UPDATE dishes SET dish_name = $1, price = $2, description = $3 WHERE dish_id = $4 RETURNING *", [dish_name, price, description, dish_id]);

        console.log(`Updated Data of dish_id ${dish_id} : `,response.rows[0]);

        res.status(200).json({
            "Misson" : "Dish Successfully updated!!",
            "Updated data" : {
                "dish": response.rows[0]
            }
        });
        
    } catch (error) {
        console.error(error.message);
        
    }
});





//Categrory update karni hai based on category_id
app.put('/categories/:category_id', async(req, res) => {
    try {
        const {category_id} = req.params;
        const {category_name} = req.body;

        const response = await pool.query("UPDATE categories SET category_name = $1 WHERE category_id = $2 RETURNING *", [category_name, category_id]);

        console.log(`Updated Category of category_id ${category_id} : `, response.rows[0]);
        
        res.status(200).json({
            "Misson" : "Category Successfully updated!!",
            "Updated data" : {
                "category": response.rows[0]
            }
        })
        
        
    } catch (error) {
        console.error(error.message);
        
    }
})






//Search functionality
app.get('/dishes/search', async(req, res) => {
    try {
        const {name} = req.query;

        const response = await pool.query("SELECT * FROM dishes WHERE dish_name ILIKE $1", [`%${name}%`]);

        console.log(`Search results for ${name} : `, response.rows);

        res.status(200).json({
            "Misson": "Search Results Fetched Successfully!!",
            data: {
                "results": response.rows.length,
                "dishes": response.rows
            }
        })
        
        
    } catch (error) {
        console.error(error.message);
        
    }
})






app.use('/contact', contact);

app.use('/adminpg', adminpg);

app.use('/menu', menu);



app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
})

