import React from "react";

import classes from "./Order.css";

const order = props => {
  const ingredients = Object.keys(props.ingredients).map(
    (ingredient, index) => {
      return (
        <span key={ingredient + index}>
          {ingredient}:{props.ingredients[ingredient]}
        </span>
      );
    }
  );
  return (
    <div className={classes.Order}>
      <p>Ingredients: </p>
      <p>{ingredients} </p>
      <p>
        <strong>Total Price: {props.price}</strong>
      </p>
    </div>
  );
};

export default order;
