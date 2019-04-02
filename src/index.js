const express = require('express');
const morgan = require('morgan');
const genres = require('./routes/genres');
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

const app = express();
const env = app.get('env');

if (env === 'development') {
  app.use(morgan('tiny'));
}
app.use(express.json());
app.use('/api/genres', genres);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

const port = process.env.PORT || 3000;
console.log('Environment:', env);
app.listen(port, () => console.log(`Listening on port ${port}...`));
