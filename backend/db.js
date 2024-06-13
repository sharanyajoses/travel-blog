// This file is used to connect to the PostgreSQL database.

const { Pool } = require('pg');


  // Check if password is not a string or undefined
  if (typeof process.env.PGPASSWORD !== 'string') {
    console.error('Error: Database password must be a string. Current type:', typeof process.env.PGPASSWORD);
  }

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: 'localhost', // Or your specific host
  database: 'travel_blog', // Or your specific database name
  port: 5432 // Default PostgreSQL port
});

module.exports = { pool };
