import React from "react";

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  const transformedIngredients = props =>
    Object.keys(props.ingredients)
      .map(ingredient => {
        return props.ingredients[ingredient]
          ? [...Array(props.ingredients[ingredient])].map((_, index) => {
              return (
                <BurgerIngredient type={ingredient} key={ingredient + index} />
              );
            })
          : [];
      })
      .reduce((ingredients, ingredient) => ingredients.concat(ingredient), []);
  const showIngredients = props => {
    let returnableElement;
    if (Object.keys(props.ingredients)) {
      const ingredients = transformedIngredients(props);
      if (ingredients.length > 0) {
        returnableElement = ingredients;
      } else {
        returnableElement = <p>Please start adding ingredients!</p>;
      }
    }

    return returnableElement;
  };
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {showIngredients(props)}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
