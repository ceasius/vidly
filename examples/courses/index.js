const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');
const courses = require('./routes/courses');

const app = express();
const env = app.get('env');

app.use(express.json);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
if (env === 'development') app.use(morgan('tiny'));

app.use('/api/courses', courses);
