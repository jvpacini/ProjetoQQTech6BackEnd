const { Pool } = require('pg');
require('dotenv').config()

const pool = new Pool({
    user: process.env.USER,
    host: 'localhost',
    database: 'postgres',
    password: process.env.PASSWORD,
    port: 5432,
});

module.exports = pool;
