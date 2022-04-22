function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(days => days.name === day)[0];
  if (!filteredDay) {
    return [];
  }
  const resultArr = [];
  for (let id of filteredDay.appointments) {
    const obj = state.appointments[id];
    resultArr.push(obj);
  }
  return resultArr;
}

module.exports = { getAppointmentsForDay };