const express = require('express');
const router = express.Router();
const  pool = require('../db');

router.get('/', async(req, res) => { // Get all categories with their dishes
    try {
        const response = await pool.query(`
            SELECT 
            c.category_id, 
            c.category_name,
            COALESCE(
                json_agg(
                    json_build_object(
                        'dish_id', d.dish_id,
                        'dish_name', d.dish_name,
                        'price', d.price,
                        'description', d.description
                    )
                ) FILTER (WHERE d.dish_id IS NOT NULL), '[]'
            ) 
            AS dishes
            FROM categories c 
            LEFT JOIN dishes d 
            ON d.category_id = c.category_id
            GROUP BY c.category_id, c.category_name
            ORDER BY c.category_name;`);

        res.status(200).json({ status: "success", data: response.rows });
        
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
        
    }
})


module.exports = router;