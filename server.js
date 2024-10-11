const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs'); // Import the fs module for file operations
const path = require('path'); // Import path module for handling file paths

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST route to handle data submission
app.post('/api/save-data', (req, res) => {
    const userData = req.body; // Get the user data from the request body
    console.log('Received data:', userData); // Log the received data for debugging

    // Prepare the data to be written to the file
    const dataToSave = JSON.stringify(userData) + '\n'; // Convert object to JSON string and add a newline

    // Define the path for data.txt file
    const filePath = path.join(__dirname, 'data.txt');

    // Write data to data.txt
    fs.appendFile(filePath, dataToSave, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).send({ message: "Failed to save data." });
        }
        res.status(200).send({ message: "Data saved successfully!" });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
