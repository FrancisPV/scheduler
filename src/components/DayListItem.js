import React from "react";
import "components/DayListItem.scss";
import "../styles/typography.scss";
const classNames = require("classnames");

export default function DayListItem(props) {
  const DayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const noSpotRemaining = (
    <li onClick={() => props.setDay(props.name)} className={DayListItemClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">no spots remaining</h3>
    </li>
  );

  const oneSpotRemaining = (
    <li onClick={() => props.setDay(props.name)} className={DayListItemClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spot remaining</h3>
    </li>
  );

  const manySpotRemaining = (
    <li onClick={() => props.setDay(props.name)} className={DayListItemClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );

  if (props.spots === 0) {
    return noSpotRemaining;
  } else if (props.spots === 1) {
    return oneSpotRemaining;
  } else {
    return manySpotRemaining;
  }
}
