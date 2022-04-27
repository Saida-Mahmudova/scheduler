import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  function setDay(day) {
    setState({ ...state, day })
  }

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
      Promise.resolve(axios.get('http://localhost:8001/api/interviewers'))
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])

  function dayData(day) {
    const weekDays = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return weekDays[day]
  }
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const dayOfWeek = dayData(state.day)

    let day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek]
    }

    if (!state.appointments[id].interview) {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots - 1
      }
    } else {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots
      }
    }

    let daysOfWeek = state.days
    daysOfWeek[dayOfWeek] = day;
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview: interview })
      .then(res => {
        setState({ ...state, appointments, daysOfWeek })
        return res
      })
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    const dayOfWeek = dayData(state.day)

    const day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots + 1
    }

    let daysOfWeek = state.days
    daysOfWeek[dayOfWeek] = day;

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(res => {
        setState({ ...state, appointments, daysOfWeek })
        return res
      })
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}