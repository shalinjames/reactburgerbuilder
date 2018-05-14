import React, { Component } from "react";

import Hoc from "../../higherordercomps/hoc";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENTS_PRICE = {
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.7,
  salad: 0.5
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      meat: 0,
      cheese: 0,
      bacon: 0,
      salad: 0
    },
    totalPrice: 0
  };

  updateIngredientHandler = (type, count, totalPrice) => {
    const ingredients = { ...this.state.ingredients };
    ingredients[type] = count;
    this.setState({ ingredients, totalPrice });
  };
  addIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
    this.updateIngredientHandler(type, updatedCount, updatedPrice);
  };
  removeIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] - 1;
    const updatedPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
    this.updateIngredientHandler(type, updatedCount, updatedPrice);
  };
  render() {
    return (
      <Hoc>
        <Burger ingredients={this.state.ingredients} />
        <BurgerControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
        />
      </Hoc>
    );
  }
}

export default BurgerBuilder;
