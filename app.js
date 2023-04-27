// Imports
const path = require('path');
const mongoose = require('./config/mongo_connection.js');

// Express Setup
const express = require('express');
const app = express();
const cors = require('cors');

// Environment Variables
const logger = require('./config/logger.js');
require('dotenv').config();

// Middleware
if(process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: 'http://localhost:19006',
  }));
}
app.use(express.json());
app.use('/api/protected', require('./middlewares/jwt_auth.js'));

// Routes
app.use('/api', require('./routes/api/auth.js'));
app.use('/api/protected', require('./routes/api/protected/user.js'));
app.use('/api/protected', require('./routes/api/protected/chat.js'));

// Serve Frontend, Assets
app.use(express.static(path.join(__dirname, 'frontend/web-build')));
app.use(express.static(path.join(__dirname, 'frontend/assets/')));


// Start Server
app.listen(process.env.PORT, () => { 
  logger.info(`Server is hosted at http://localhost:${process.env.PORT}`)
});

