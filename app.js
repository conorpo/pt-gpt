// Imports
const path = require('path');
const mongoose = require('./config/mongo_connection.js');

// Express Setup
const express = require('express');
const app = express();
const session = require('express-session');


// Environment Variables
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24// 1 day
    },
  })
);
app.use('/api', require('./routes/api/chat'));
app.use('/api', require('./routes/api/register.js'));
app.use('/api', require('./routes/api/login.js'));
app.use('/api', require('./routes/api/update_info.js'));
app.use(express.static(path.join(__dirname, 'frontend/web-build')));

// Start Server
app.listen(PORT, () => { 
  if(NODE_ENV === 'development') {
    console.log(`Server is hosted at http://localhost:${PORT}`);
  }
});

