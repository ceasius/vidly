const express = require('express');
const morgan = require('morgan');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const returns = require('../routes/returns');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('../swagger.json');

module.exports = function(app) {
  const env = app.get('env');
  if (env === 'development') app.use(morgan('tiny'));
  app.use(express.json());
  app.use('/api/genres', genres);
  app.use('/api/customers', customers);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals);
  app.use('/api/returns', returns);
  app.use('/api/users', users);
  app.use('/api/logins', auth);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get('/', (req, res) => {
    res.redirect('/api-docs');
  });

  app.use(error);
};
