import React, { Component } from "react";
import { Route } from "react-router-dom";

import Hoc from "../../higherordercomps/Hoc/hoc";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../services/axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../higherordercomps/withErrorHandler/withErrorHandler";

const INGREDIENTS_PRICE = {
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.7,
  salad: 0.5
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };
  componentDidMount = () => {
    axios
      .get("https://react-burger-1d081.firebaseio.com/ingredients.json")
      .then(response => this.setState({ ingredients: response.data }))
      .catch(error => this.setState({ error: error }));
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
    const queryParams = Object.keys(this.state.ingredients).map(ingredient => {
      return `${encodeURIComponent(ingredient)}=${encodeURIComponent(
        this.state.ingredients[ingredient]
      )}`;
    });
    queryParams.push(`totalPrice=${this.state.totalPrice}`);
    this.props.history.push({
      pathname: "/checkout",
      search: queryParams.join("&")
    });
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
    let orderSummary = null;
    let burger = this.state.error ? (
      <p> Error in loading the ingredient </p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Hoc>
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

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }

    return (
      <Hoc>
        <Modal
          show={this.state.purchasing}
          modelClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Hoc>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
