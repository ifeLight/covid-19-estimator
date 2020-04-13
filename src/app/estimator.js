const covid19Estimator = require('./functions/estimator');
const covidInputValidator = require('./validators/covidInput');

module.exports = function estimatorJson(req, res) {
  const { body } = req;
  const validation = covidInputValidator(body);
  if (validation.error) {
    return res.status(400).send(validation.error.details);
  }
  const result = covid19Estimator(body);
  return res.status(200).json(result);
};
