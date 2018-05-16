import React from "react";

import Hoc from "../../../higherordercomps/hoc";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients).map(ingredient => {
    return (
      <li key={ingredient}>
        <span style={{ textTransform: "bold" }}>{ingredient}</span>:
        {props.ingredients[ingredient]}
      </li>
    );
  });

  return (
    <Hoc>
      <h3> Your order Summary </h3>
      <p> A delecious burger with following ingredients</p>
      <ul> {ingredientsSummary} </ul>
      <p>
        <strong>Total Price : {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button clicked={props.purchaseContinue} btnType="Success">
        Continue
      </Button>
      <Button clicked={props.purchaseCanceled} btnType="Danger">
        Cancel
      </Button>
    </Hoc>
  );
};

export default orderSummary;
