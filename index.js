// eslint-disable-next-line import/no-extraneous-dependencies
import 'source-map-support/register';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

// Express Controllers
import estimator from './src/app/estimator';
import estimatorXml from './src/app/estimatorXml';
import logsEndpoint from './src/app/logs';

// Express Middlewares
import responseTime from './src/app/middlewares/responseTime';

// Initiating Main Express app
const app = express();

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const logFile = path.join(__dirname, 'logs.txt');
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
