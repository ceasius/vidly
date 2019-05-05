const node_env = process.env.NODE_ENV;
const winston = require('winston');
if (node_env !== 'test') require('winston-mongodb');
require('express-async-errors');
const config = require('config');

function startup(env) {
  const loggerOptions = {
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({
        filename: `./logs/${env}-error.log`,
        level: 'error'
      })
    ]
  };

  const logger = winston.createLogger(loggerOptions);
  const conn = {
    db: config.get('mongoConnection.connectionString'),
    collection: 'logs',
    metaKey: 'meta'
  };

  if (env !== 'test') logger.add(new winston.transports.MongoDB(conn));

  if (env === 'development')
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
        level: 'debug',
        colorize: true,
        prettyPrint: true
      })
    );

  module.exports.logger = logger;

  process.on('uncaughtException', err => {
    logger.error('Uncaught- ', err);
    process.exit(1);
  });

  process.on('unhandledRejection', err => {
    console.error('Uncaught Rejection: ', err.message);
    logger.error(err);
    process.exit(1);
  });

  return logger;
}
module.exports.startup = startup;
