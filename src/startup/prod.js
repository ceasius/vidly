const helmet = require('helmet');
const compression = require('compression');

module.exports = function(app) {
  const env = app.get('env');
  if (env === 'production') {
    app.use(helmet());
    app.use(compression());
  }
};
