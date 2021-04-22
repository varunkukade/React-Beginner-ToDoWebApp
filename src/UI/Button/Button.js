import React from "react";
import classes from "./Button.css";

const button = (props) => (
  <button
    disabled={props.disabled}
    onClick={props.btnClicked}
    className={[
      classes.Button,
      classes[props.btnType],
      classes[props.extraButtonType],
    ].join(" ")}
  >
    {props.children}
  </button>
);

export default button;
