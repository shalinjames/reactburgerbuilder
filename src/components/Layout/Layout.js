import React from "react";
import Hoc from "../../higherordercomps/hoc";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
const Layout = props => {
  return (
    <Hoc>
      <Toolbar />
      <SideDrawer />
      <div> Backdrop </div>
      <main className={classes.Contents}>{props.children}</main>
    </Hoc>
  );
};

export default Layout;
