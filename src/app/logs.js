const fs = require('fs');

module.exports = function logger(filename) {
  return function log(req, res) {
    const file = fs.readFileSync(filename);
    res.type('text/plain');
    res.status(200).send(file);
  };
};
