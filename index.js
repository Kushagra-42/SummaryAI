const express = require('express');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3000;
const summarizeText = require('./summarize.js');

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(express.static('public')); // Serve static files from the 'public' directory

// Handle POST requests to the '/summarize' endpoint
app.post('/summarize', (req, res) => {
  // Get the text_to_summarize property from the request body
  const text = req.body.text_to_summarize;

  // Call your summarizeText function, passing in the text from the request
  summarizeText(text)
    .then(response => {
      res.send(response); // Send the summary text as a response
    })
    .catch(error => {
      console.log(error.message);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
