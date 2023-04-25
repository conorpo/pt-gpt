// Imports
const path = require('path');
const mongoose = require('./config/mongo_connection.js');

// Express Setup
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Environment Variables
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
if(NODE_ENV === 'development') {
  app.use(cors({
    origin: 'http://localhost:19006',
  }));
}
app.use(express.json());
app.use('/api', require('./routes/api/register.js'));
app.use('/api', require('./routes/api/login.js'));
app.use('/api/protected', (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if(!authHeader) return res.status(401).json({msg: 'No JWT token provided'});
  
  const [scheme, token] = authHeader.split(' ');
  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({msg: 'Invalid JWT token'});
  }
});
app.use('/api/protected', require('./routes/api/protected/chat.js'));
app.use('/api/protected', require('./routes/api/protected/update_info.js'));
app.use(express.static(path.join(__dirname, 'frontend/web-build')));
//Host Images
app.use(express.static(path.join(__dirname, 'frontend/assets/')));


// Start Server
app.listen(PORT, () => { 
  if(NODE_ENV === 'development') {
    console.log(`Server is hosted at http://localhost:${PORT}`);
  }
});

