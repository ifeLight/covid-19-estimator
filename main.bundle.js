"use strict";

var _interopRequireDefault3 = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireDefault2 = _interopRequireDefault3(require("@babel/runtime/helpers/interopRequireDefault"));

require("source-map-support/register");

var _express = require("express");

var _express2 = (0, _interopRequireDefault2.default)(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = (0, _interopRequireDefault2.default)(_bodyParser);

var _path = require("path");

var _path2 = (0, _interopRequireDefault2.default)(_path);

var _estimator = require("./src/app/estimator");

var _estimator2 = (0, _interopRequireDefault2.default)(_estimator);

var _estimatorXml = require("./src/app/estimatorXml");

var _estimatorXml2 = (0, _interopRequireDefault2.default)(_estimatorXml);

var _logs = require("./src/app/logs");

var _logs2 = (0, _interopRequireDefault2.default)(_logs);

var _responseTime = require("./src/app/middlewares/responseTime");

var _responseTime2 = (0, _interopRequireDefault2.default)(_responseTime);

// eslint-disable-next-line import/no-extraneous-dependencies
// Express Controllers
// Express Middlewares
// Initiating Main Express app
const app = (0, _express2.default)(); // use body parser so we can get info from POST and/or URL parameters

app.use(_bodyParser2.default.urlencoded({
  extended: false
}));
app.use(_bodyParser2.default.json());

const logFile = _path2.default.join(__dirname, 'logs.txt'); // Middlewares


app.use((0, _responseTime2.default)(logFile)); // The API endpoints

app.post('/api/v1/on-covid-19', _estimator2.default);
app.post('/api/v1/on-covid-19/json', _estimator2.default);
app.post('/api/v1/on-covid-19/xml', _estimatorXml2.default);
app.get('/api/v1/on-covid-19/logs', (0, _logs2.default)(logFile)); // 404 endpoint

app.use((req, res) => {
  res.status(404).send('Page not found');
});
const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log('Node Server Started', `Listening at Port: ${port}`);
});
