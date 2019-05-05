const logger = require('../startup/logger').logger;

// log levers [error, warn, info, verbose, debug, silly]
module.exports = function(err, req, res, next) {
  if (err) {
    err.meta = { stack: err.stack };
    logger.error('Internal Server Error: ', err);
    return res.status(500).send('Something went wrong internally.');
  }
};
