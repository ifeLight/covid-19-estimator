export default function (timeToElapse, periodType) {
  if (periodType === 'months') {
    return Math.trunc(30 * timeToElapse);
  }
  if (periodType === 'weeks') {
    return Math.trunc(7 * timeToElapse);
  }
  return timeToElapse;
}
