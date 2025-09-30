const {Pool} = require('pg');
require('dotenv').config(); 

const pool = new Pool ({
    user : 'postgres',
    password: "adyamishra",
    host: 'localhost',
    port: 5432,
    database: 'restaurant_db'
});

module.exports = pool;