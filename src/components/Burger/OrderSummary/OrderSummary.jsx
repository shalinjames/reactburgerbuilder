import React from "react";

import Hoc from "../../../higherordercomps/hoc";

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
      <p>Continue to checkout?</p>
    </Hoc>
  );
};

export default orderSummary;
