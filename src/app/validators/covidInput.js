import Joi from 'joi';

export default function (data) {
  const schema = Joi.object().keys({
    region: Joi.object().keys({
      name: Joi.string().alphanum().required(),
      avgAge: Joi.number().required(),
      avgDailyIncomeInUSD: Joi.number().required(),
      avgDailyIncomePopulation: Joi.number().required()
    }),
    periodType: Joi.string().alphanum().required(),
    timeToElapse: Joi.number().integer().required(),
    reportedCases: Joi.number().integer().required(),
    population: Joi.number().integer().required(),
    totalHospitalBeds: Joi.number().integer().required()
  });

  const result = Joi.validate(data, schema);
  return result;
}
