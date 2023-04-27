const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  )
});

if(process.env.NODE_ENV === 'production') {
  logger.add(new transports.File({ filename: '../logs/error.log', level: 'error' }))
  logger.add(new transports.File({ filename: '../logs/combined.log' }));
} else {
  logger.add(new transports.Console());
} 

module.exports = logger;
