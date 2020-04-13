const xml2js = require('xml2js');
const covid19Estimator = require('./functions/estimator');
const covidInputValidator = require('./validators/covidInput');

module.exports = function estimatorXml(req, res) {
  const { body } = req;
  const validation = covidInputValidator(body);
  if (validation.error) {
    return res.status(400).send(validation.error.details.message);
  }
  const result = covid19Estimator(body);
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(result);
  res.type('application/xml');
  return res.status(200).send(xml);
};
