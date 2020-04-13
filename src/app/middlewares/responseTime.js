const fs = require('fs');

// response-time-logger.js
function logResponseTime(fileLocation) {
  return function logresponsetimFunc(req, res, next) {
    const startHrTime = process.hrtime();
    // const fileLocation = path.join(__dirname, 'log.txt');

    res.on('finish', () => {
      const elapsedHrTime = process.hrtime(startHrTime);
      const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
      const { method, path: endpointPath } = req;
      const { statusCode } = res;

      fs.appendFileSync(fileLocation, `${method}\t\t${endpointPath}\t\t\t${statusCode}\t\t${elapsedTimeInMs}\tms\n`);
    });

    next();
  };
}

module.exports = logResponseTime;
