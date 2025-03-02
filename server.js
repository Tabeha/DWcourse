const express = require('express');  // Import Express framework
const cors = require('cors');  // Import CORS middleware for handling cross-origin requests
const fs = require('fs');  // Import File System module to read JSON files

const app = express();
app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Allow the server to handle JSON requests

// Database connection setup (Commented out)
/*
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',  // Database username
    host: 'localhost',  // Database host
    database: '',  // Database name (leave empty if not using it)
    password: 'tupakill3',  // Database password
    port: 5432,  // PostgreSQL default port
    options: '-c search_path=parsee'  // Set the schema search path
});

async function initDB() {
    try {
        // Check the current search_path setting in PostgreSQL
        const resPath = await pool.query('SHOW search_path');
        console.log('Current search_path:', resPath.rows);

        // Check the current database user
        const resUser = await pool.query('SELECT current_user, session_user');
        console.log('Database user in Node.js:', resUser.rows);
    } catch (err) {
        console.error('Database initialization error:', err);
    }
}

// Uncomment this line if you want to initialize the database connection
// initDB();
*/

// Path to the JSON file containing movie data
const jsonFilePath = '/home/makar/IdeaProjects/untitled1/films.json';

// Define an API route to return movie data from the JSON file
app.get('/movies', async (req, res) => {
    try {
        // Read the JSON file synchronously (blocking operation)
        const data = fs.readFileSync(jsonFilePath, 'utf8');

        // Parse JSON data into a JavaScript object
        const movies = JSON.parse(data);

        // Send the parsed movie data as a JSON response
        res.json(movies);
    } catch (err) {
        console.error('Error reading JSON file:', err);
        res.status(500).send('Server error');  // Return a 500 Internal Server Error response
    }
});

// Start the Express server on port 3000
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
