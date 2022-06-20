import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  return (
    <div
      className={`${classes.control} ${
        // emailIsValid === false ? classes.invalid : ""
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor="props.id">{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};
