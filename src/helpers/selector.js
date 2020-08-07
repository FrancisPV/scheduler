export function getAppointmentsForDay (state, day) {
  const foundDay = state.days.find(dayObj => dayObj.name === day)

  const appointmentIds = foundDay ? (foundDay.appointments || []) : [];

  return appointmentIds.map(id => state.appointments[id]);

};

export function getInterview(state, interview) {
  if (interview === null) return null;

  const interviewerId = interview.interviewer

  if (!state.interviewers[interviewerId]) return null;
  
  return { ...interview, interviewer: state.interviewers[interviewerId] };
};

export function getInterviewersForDay (state, day) {
  const foundDay = state.days.find(dayObj => dayObj.name === day)

  const interviewerIds = foundDay ? (foundDay.interviewers || []) : [];

  return interviewerIds.map(id => state.interviewers[id]);
};
