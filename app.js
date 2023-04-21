// Imports
const path = require('path');

// Express Setup
const express = require('express');
const app = express();

// Environment Variables
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(express.json());
app.use('/api', require('./routes/api/chat'));
app.use(express.static(path.join(__dirname, 'frontend/web-build')));

// Start Server
app.listen(PORT, () => { 
  if(NODE_ENV === 'development') {
    console.log(`Server is hosted at http://localhost:${PORT}`);
  }
});

