import React from "react";
import Hoc from "../../higherordercomps/hoc";
import classes from "./Layout.css";

const Layout = props => {
  return (
    <Hoc>
      <div>Toolbar, SideDrawer, Backdrop </div>
      <main className={classes.Contents}>{props.children}</main>
    </Hoc>
  );
};

export default Layout;
