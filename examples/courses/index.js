//const config = require('config');
//const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');
const courses = require('./routes/courses');
//const debug = require('debug')('app:startup');

const app = express();
const env = app.get('env');

//app.set('view engine', 'pug');
//app.set('views', './views');

app.use(express.json);
//app.use(express.urlencoded({ extended: true }));
//app.use(express.static('public'));
//app.use(helmet());
if (env === 'development') app.use(morgan('tiny'));

app.get('/', (req, res) => {
  console.log('test');
  res.send('hello');
});
//app.get('/', (req, res) => {
//  res.render('index', { title: config.get('name'), message: 'Henlo world.' });
//});
//app.use('/api/courses', courses);

const port = process.env.PORT || 3001;
//console.log('App Name: ', config.get('name'));
console.log('Environment:', env);
//console.log('Mail Server: ', config.get('mail.host'));
//console.log('Mail Credentials: ', config.has('mail.password'));
app.listen(port, () => console.log(`Listening on port ${port}...`));
