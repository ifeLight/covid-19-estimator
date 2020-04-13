// eslint-disable-next-line import/no-extraneous-dependencies
// import 'source-map-support/register';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Express Controllers
const estimator = require('./src/app/estimator');
const estimatorXml = require('./src/app/estimatorXml');
const logsEndpoint = require('./src/app/logs');

// Express Middlewares
const responseTime = require('./src/app/middlewares/responseTime');

// Initiating Main Express app
const app = express();

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log File
const logFile = path.join(__dirname, 'logs.txt');

// Delete log File at startup
// const logFileExist = fs.existsSync(logFile);
// if (logFileExist) {
//  fs.unlinkSync(logFile);
// }

// Middlewares
app.use(responseTime(logFile));

// The API endpoints
app.post('/api/v1/on-covid-19', estimator);
app.post('/api/v1/on-covid-19/json', estimator);
app.post('/api/v1/on-covid-19/xml', estimatorXml);
app.get('/api/v1/on-covid-19/logs', logsEndpoint(logFile));

// 404 endpoint
app.use((req, res) => {
  res.status(404).send('Page not found');
});

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log('Node Server Started', `Listening at Port: ${port}`);
});
