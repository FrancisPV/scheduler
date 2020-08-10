import React from "react";
import "components/Appointment/styles.scss"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import useVisualMode from "../../hooks/useVisualMode"
import Form from "components/Appointment/Form"
import Saving from "components/Appointment/Saving"
import Deleting from "components/Appointment/Deleting"
import Confirm from "components/Appointment/Confirm"
import Error from "components/Appointment/Error"



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE ="ERROR_SAVE"

export default function Appointment(props) {
  const interviewers = props.interviewers || [];
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)

  const bookInterview = props.bookInterview;

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  };

  const cancel = () => {
    back(EMPTY)
  };

  const cancelInterview = props.cancelInterview;

  const deleteCallback = () => {
    transition(DELETING, true)
    cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  };


  return (
    <>
      {mode === ERROR_DELETE && <Error message="could not delete the appointment" onClose={() => transition(SHOW)} />}
      {mode === ERROR_SAVE && <Error message="could not save the appointment" onClose={() => transition(SHOW)} />}
      {mode === EDIT && <Form  name={props.interview.student} interviewers={props.interviewers} interviewer={props.interview.interviewer.id} />}
      {mode === CONFIRM && <Confirm onConfirm={deleteCallback} onCancel={() => transition(SHOW)} />}
      {mode === SAVING && <Saving />}
      {mode === DELETING && <Deleting />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview ? props.interview.student : 'test'}
          interviewer={props.interview ? props.interview.interviewer.name : 'test'}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )
      }
      {mode === CREATE && <Form  interviewers={interviewers} onSave={save} onCancel={cancel} />}
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

