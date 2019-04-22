const mongoose = require('mongoose');
const config = require('config');
const logger = require('./logger').logger;

module.exports = function() {
  mongoose
    .connect(
      config.get('mongoConnection.connectionString'),
      config.get('mongoConnection.options')
    )
    .then(() => {
      logger.debug('Connected to MongoDB...');
    })
    .catch(err => {
      logger.error('Could not connect to MongoDB: ', err);
      process.exit(1);
    });
};
