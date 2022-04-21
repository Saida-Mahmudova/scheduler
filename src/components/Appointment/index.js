import React from "react";
import './styles.scss'

export default function Appointment(props) {
  const appointmentTime = () => {
    const time = props.time;
    if (time) {
      return `Appointment at ${time}`
    } else {
      return `No Appointments`
    }
  }
  return (
    <article className="appointment">
      {appointmentTime()}
    </article>
  )
}