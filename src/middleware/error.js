const logger = require('../middleware/logger');

// log levers [error, warn, info, verbose, debug, silly]
module.exports = function(err, req, res, next) {
  logger.error(err.message);
  if (err) return res.status(500).send('Something went wrong internally.');
};
