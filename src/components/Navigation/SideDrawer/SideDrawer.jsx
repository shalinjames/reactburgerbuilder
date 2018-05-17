import React from "react";

import classes from "./SideDrawer.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import Hoc from "../../../higherordercomps/Hoc/hoc";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = props => {
  const sideDrawerClasses = [classes.SideDrawer];
  sideDrawerClasses.push(props.open ? classes.Open : classes.Close);
  return (
    <Hoc>
      <Backdrop show={props.open} clicked={props.close} />
      <div className={sideDrawerClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Hoc>
  );
};

export default sideDrawer;
