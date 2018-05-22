import React, { Component } from "react";

import classes from "./Modal.css";
import Hoc from "../../../higherordercomps/Hoc/hoc";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  componentWillUpdate() {
    console.log("[Modal] updated!");
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
  render() {
    return (
      <Hoc>
        <Backdrop show={this.props.show} clicked={this.props.modelClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Hoc>
    );
  }
}

export default Modal;
