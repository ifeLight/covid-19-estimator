import covid19Estimator from '../estimator';
import covidInputValidator from './validators/covidInput';

export default function (req, res) {
  const { body } = req;
  const validation = covidInputValidator(body);
  if (validation.error) {
    return res.status(400).send(validation.error.details);
  }
  const result = covid19Estimator(body);
  return res.status(200).json(result);
}
