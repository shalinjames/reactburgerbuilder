import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Hoc from "../../higherordercomps/Hoc/hoc";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideBar: false
  };
  sideBarOpenHandler = () => {
    this.setState({ showSideBar: true });
  };
  sideBarToggleHandler = () => {
    this.setState((prevState, props) => ({
      showSideBar: !prevState.showSideBar
    }));
  };
  render() {
    return (
      <Hoc>
        <Toolbar
          openSidebar={this.sideBarOpenHandler}
          isAuth={this.props.isAuthenticated}
        />
        <SideDrawer
          open={this.state.showSideBar}
          close={this.sideBarToggleHandler}
          isAuth={this.props.isAuthenticated}
        />
        <div> Backdrop </div>
        <main className={classes.Contents}>{this.props.children}</main>
      </Hoc>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authData.idToken
});

export default withRouter(connect(mapStateToProps)(Layout));
