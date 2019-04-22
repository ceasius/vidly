const express = require('express');

const app = express();
const env = app.get('env');

const logger = require('./startup/logger').startup(env);
require('./startup/routes')(app);
require('./startup/mongo')();
require('./startup/config')();

const port = process.env.PORT || 3000;
logger.debug(`Env-${env}`);
app.listen(port, () => logger.debug(`Listening on port ${port}...`));
