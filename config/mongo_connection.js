const mongoose = require('mongoose');
const logger = require('./logger');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    logger.info(`MongoDB Connection Successful.`);
})
.catch((err) => {
    logger.error(err);
});

module.exports = mongoose;