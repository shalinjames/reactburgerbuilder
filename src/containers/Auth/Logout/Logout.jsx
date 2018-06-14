import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../store/actions/actions";

class Logout extends Component {
  state = {};
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
});
export default connect(
  null,
  mapDispatchToProps
)(Logout);
