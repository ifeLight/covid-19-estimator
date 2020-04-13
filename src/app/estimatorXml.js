import xml2js from 'xml2js';
import covid19Estimator from '../estimator';
import covidInputValidator from './validators/covidInput';


export default function (req, res) {
  const { body } = req;
  const validation = covidInputValidator(body);
  if (validation.error) {
    return res.status(400).send(validation.error.details.message);
  }
  const result = covid19Estimator(body);
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(result);
  return res.status(200).send(xml);
}
