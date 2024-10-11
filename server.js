const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs'); // Importing fs to handle file writing

const app = express();
const PORT = process.env.PORT || 4452;

// Middleware
const corsOptions = {
    origin: ['http://localhost:3000', 'https://your-frontend-url.vercel.app'], // Update with your frontend URL
    methods: ['POST', 'GET'], // Specify allowed methods
    credentials: true, // Allow credentials
};

app.use(cors(corsOptions));
 // Allow CORS for all origins
app.use(bodyParser.json());

// POST route to handle data submission
app.post('/api/save-data', (req, res) => {
    const userData = req.body; // Get the user data from the request body
    console.log('Received data:', userData); // Log the received data for debugging
    
    // Save data to data.txt
    fs.appendFile('data.txt', JSON.stringify(userData) + '\n', (err) => {
        if (err) {
            console.error('Error saving data to file:', err);
            return res.status(500).send({ message: "Error saving data." });
        }
        res.status(200).send({ message: "Data saved successfully!" });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // This should be the output you see
});
