const express = require('express');
const morgan = require('morgan');
const config = require('config');
const helmet = require('helmet');
const courses = require('./routes/courses');
const debug = require('debug')('app:startup');

const app = express();
const env = app.get('env');

app.set('view engine', 'pug');
app.set('views', './views');

if (env === 'development') app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);

app.get('/', (req, res) => {
  res.render('index', {
    title: config.get('name'),
    message: 'Welcome to Courses'
  });
});

const port = process.env.PORT || 3001;
console.log('App Name: ', config.get('name'));
console.log('Mail Server: ', config.get('mail.host'));
console.log('Mail Credentials: ', config.has('mail.password'));
console.log('Environment:', env);
app.listen(port, () => console.log(`Listening on port ${port}...`));
