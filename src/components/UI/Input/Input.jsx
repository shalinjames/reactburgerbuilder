import React from "react";

import classes from "./Input.css";
const input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.touched) {
    inputClasses.push(classes.InputInvalid);
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementDefaultProps}
          className={[inputClasses.join(" ")]}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementDefaultProps}
          className={[inputClasses.join(" ")]}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select className={[inputClasses.join(" ")]} onChange={props.changed}>
          {props.elementDefaultProps.options.map((option, index) => {
            return (
              <option value={option.value} key={option.value + index}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementDefaultProps}
          className={[inputClasses.join(" ")]}
          onChange={props.changed}
        />
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
