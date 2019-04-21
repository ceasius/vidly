const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('config');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const app = express();
const env = app.get('env');

if (!config.get('jwtPrivateKey')) {
  console.error('Cannot find JWT Private Key');
  process.exit(1);
}

mongoose
  .connect('mongodb://localhost/vidly', {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => {
    console.error('Could not connect to MongoDB: ', err.message);
    process.exit(1);
  });

if (env === 'development') app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/logins', auth);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

const port = process.env.PORT || 3000;
console.log('Environment:', env);
app.listen(port, () => console.log(`Listening on port ${port}...`));
