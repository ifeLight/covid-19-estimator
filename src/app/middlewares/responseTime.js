const fs = require('fs');

// response-time-logger.js
function logResponseTime(fileLocation) {
  return function logresponsetimFunc(req, res, next) {
    const startTime = Date.now();
    // const fileLocation = path.join(__dirname, 'log.txt');

    res.on('finish', () => {
      // const elapsedHrTime = process.hrtime(startHrTime);
      // const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
      const elapsedTimeInMs = Date.now() - startTime;
      const elapseTimeFormat = elapsedTimeInMs.toString().length > 1 ? elapsedTimeInMs.toString() : `0${elapsedTimeInMs}`;
      const { method, path: endpointPath } = req;
      const { statusCode } = res;

      fs.appendFileSync(fileLocation, `${method}\t\t${endpointPath}\t\t${statusCode}\t\t${elapseTimeFormat}ms\n`);
    });

    next();
  };
}

module.exports = logResponseTime;
