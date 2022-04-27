const getAppointmentsForDay = (state, day) => {
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

const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }
  const interviewerData = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerData
  }
}

const getInterviewersForDay = (state, day) => {
  if (state.days.length < 1) {
    return [];
  }
  let interviewersArr = [];
  let interviewersForDay;
  for (let theDay of state.days) {
    if (theDay.name === day) {
      interviewersForDay = theDay.interviewers;
    }
  }

  if (!interviewersForDay) {
    return [];
  }

  for (let id of interviewersForDay) {
    interviewersArr.push(state.interviewers[id]);
  }
  return interviewersArr;
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };