const debug = require('debug')('mocajs:index');
require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 9000;

app.listen(port);

debug(`http://localhost:${port}`);
