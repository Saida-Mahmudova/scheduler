import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";
export default function InterviewerListItem(props) {
  const { avatar, name, selected } = props;
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  })
  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );

}