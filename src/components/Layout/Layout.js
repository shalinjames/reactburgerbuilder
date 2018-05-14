import React from "react";
import Aux from "../../hoc/Aux";
import classes from "./Layout.css";

const Layout = props => {
  console.info(classes);
  return (
    <Aux>
      <div>Toolbar, SideDrawer, Backdrop </div>
      <main className={classes.Contents}>{props.children}</main>
    </Aux>
  );
};

export default Layout;
