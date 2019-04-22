const config = require('config');
const Joi = require('joi');

module.exports = function() {
  Joi.objectId = require('joi-objectid')(Joi);
  if (!config.get('jwtPrivateKey')) {
    throw new Error('Cannot find JWT Private Key');
  }
};
