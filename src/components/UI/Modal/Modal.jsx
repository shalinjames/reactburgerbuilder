import React from "react";

import classes from "./Modal.css";
import Hoc from "../../../higherordercomps/hoc";
import Backdrop from "../Backdrop/Backdrop";

const modal = props => {
  return (
    <Hoc>
      <Backdrop show={props.show} clicked={props.modelClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(100vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        {props.children}
      </div>
    </Hoc>
  );
};

export default modal;
