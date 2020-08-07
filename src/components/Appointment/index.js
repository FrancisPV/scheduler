import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import useVisualMode from "../../hooks/useVisualMode"
import Form from "components/Appointment/Form"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"

export default function Appointment(props) {
  const interviewers = props.interviewers || [];
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)

  const bookInterview = props.bookInterview;

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(props.id, interview);
    transition(SHOW)
  };

  const cancel = () => {
    back(EMPTY)
  };

  return (
    <>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview ? props.interview.student : 'test'}
          interviewer={props.interview ? props.interview.interviewer.name : 'test'}
        />
      )
      }
      {mode === CREATE && <Form name={interviewers.name} interviewers={interviewers} onSave={save} onCancel={cancel} />}
    </>
  );
}

/* if(props.interview){
  return(
    <article className="appointment">
    <Header time={props.time}/>
    <Show student={props.interview.student} interviewer= {props.interview.interviewer.name}/>
   </article>
)} else {
  return(
  <article className="appointment">
  <Header time={props.time}/>
  <Empty />
 </article>)
} */

