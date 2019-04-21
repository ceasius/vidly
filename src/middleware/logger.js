const express = require('express');
const winston = require('winston');
require('winston-mongodb');
const config = require('config');

const loggerOptions = {};

const logger = winston.createLogger(loggerOptions);
const conn = {
  db: config.get('mongoConnection.connectionString'),
  collection: 'logs'
};

logger.add(new winston.transports.MongoDB(conn));

module.exports = logger;
