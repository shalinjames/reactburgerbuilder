import React from "react";
import classes from "./CheckoutSummary.css";
import Burger from "../Burger";
import Button from "../../UI/Button/Button";

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <Burger ingredients={props.ingredients} />
      <Button btnType="Success" clicked={props.checkoutContinued}>
        Continue
      </Button>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        Cancel
      </Button>
    </div>
  );
};

export default checkoutSummary;
