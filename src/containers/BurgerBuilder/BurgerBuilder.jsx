import React, { Component } from "react";

import Hoc from "../../higherordercomps/hoc";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
    totalPrice: 0,
    purchaseable: false,
    purchasing: false
  };

  purchaseHandler = purchasing => {
    this.setState({ purchasing });
  };
  purchaseModelHandler = () => {
    this.purchaseHandler(true);
  };
  purchaseCancelHandler = () => {
    this.purchaseHandler(false);
  };
  purchaseContinueHandler = () => {
    console.info(this.state.ingredients);
  };
  updatePurchaseable = ingredients => {
    const purchaseable = Object.values(ingredients).reduce(
      (total, cost) => total + cost,
      0
    );
    this.setState({ purchaseable: purchaseable > 0 });
  };
  updateIngredientHandler = (type, count, totalPrice) => {
    const ingredients = { ...this.state.ingredients };
    ingredients[type] = count;
    this.setState({ ingredients, totalPrice });
    this.updatePurchaseable(ingredients);
  };
  addIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
    this.updateIngredientHandler(type, updatedCount, updatedPrice);
  };
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount) {
      const updatedCount = this.state.ingredients[type] - 1;
      const updatedPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
      this.updateIngredientHandler(type, updatedCount, updatedPrice);
    }
  };
  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Hoc>
        <Modal
          show={this.state.purchasing}
          modelClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BurgerControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          purchaseable={this.state.purchaseable}
          disabled={disabledInfo}
          ordernow={this.purchaseModelHandler}
        />
      </Hoc>
    );
  }
}

export default BurgerBuilder;
