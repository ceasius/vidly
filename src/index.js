const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const genres = require('./routes/genres');
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

const app = express();
const env = app.get('env');

mongoose
    .connect('mongodb://localhost/vidly', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB: ', err.message));

if (env === 'development') app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/genres', genres);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

const port = process.env.PORT || 3000;
console.log('Environment:', env);
app.listen(port, () => console.log(`Listening on port ${port}...`));
