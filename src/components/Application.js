import React, { useState, useEffect } from "react";
import DayList from "../components/DayList";
import "components/Application.scss";
import "components/Appointment"
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "../helpers/selector";
import { getInterview } from "../helpers/selector";
import { getInterviewersForDay } from "../helpers/selector"


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        // fetch days
        return fetchDaysFromAPI().then(() => {
          setState( prev => ({
            ...prev,
            appointments
          }))
        })
      });
  }

  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        return fetchDaysFromAPI().then(() => {
          setState( prev => ({
            ...prev,
            appointments
          }))
        })
      })
  }

  const appointments = getAppointmentsForDay(state, state.day);

  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    console.log('render interview', interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  const URL1 = "http://localhost:8001/api/days";
  const URL2 = "http://localhost:8001/api/appointments";
  const URL3 = "http://localhost:8001/api/interviewers";

  const setDay = function(newday) {
    setState({ ...state, day: newday })
  }

  useEffect(() => {
    const daysRequest = axios.get(URL1);
    const appointmentsRequest = axios.get(URL2);
    const interviewersRequest = axios.get(URL3);

    Promise.all([daysRequest, appointmentsRequest, interviewersRequest]).then((all) => {
      console.log("all: ", all);
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])

  const fetchDaysFromAPI = function() {
   return axios.get(URL1)
      .then((response) => {
        console.log(response.data)
        setState(prev => ({ ...prev, days: response.data }))
      }
      )
  }



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
