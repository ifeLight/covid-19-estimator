
const covid19ImpactEstimator = (data) => {
  // Destructuring input
  const {
    region, periodType, timeToElapse, reportedCases, totalHospitalBeds
  } = data;
    // Output Properties
  const impact = {};
  const severeImpact = {};
  // Functions
  // Get Days Function
  function getDays() {
    if (periodType === 'months') {
      return Math.trunc(30 * timeToElapse);
    }
    if (periodType === 'weeks') {
      return Math.trunc(7 * timeToElapse);
    }
    return timeToElapse;
  }
  // Estimator Function
  function calcEstimate() {
    const days = getDays();
    this.infectionsByRequestedTime = this.currentlyInfected * (2 ** Math.trunc(days / 3));
    this.severeCasesByRequestedTime = Math.trunc(0.15 * this.infectionsByRequestedTime);
    const availableBeds = (0.35 * totalHospitalBeds);
    this.hospitalBedsByRequestedTime = Math.trunc(availableBeds - this.severeCasesByRequestedTime);
    this.casesForICUByRequestedTime = Math.trunc(0.05 * this.infectionsByRequestedTime);
    this.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * this.infectionsByRequestedTime);
    const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;
    const avgCost = Number(avgDailyIncomeInUSD) * Number(avgDailyIncomePopulation);
    this.dollarsInFlight = Math.trunc((this.infectionsByRequestedTime * avgCost) / days);
  }
  // ----- Object properties -------
  impact.currentlyInfected = Math.trunc(Number(reportedCases) * 10);
  severeImpact.currentlyInfected = Math.trunc(Number(reportedCases) * 50);
  // Infections By Request Time Property
  calcEstimate.call(impact);
  calcEstimate.call(severeImpact);

  const output = {
    data,
    estimate: {
      impact,
      severeImpact
    }
  };
  return output;
};
module.exports = covid19ImpactEstimator;
