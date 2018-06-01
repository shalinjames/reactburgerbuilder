import React, { Component } from "react";
import { connect } from "react-redux";

import Hoc from "../../higherordercomps/Hoc/hoc";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../services/axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../higherordercomps/withErrorHandler/withErrorHandler";
import * as actionTypes from "./../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };
  componentDidMount = () => {
    // axios
    //   .get("https://react-burger-1d081.firebaseio.com/ingredients.json")
    //   .then(response => this.setState({ ingredients: response.data }))
    //   .catch(error => this.setState({ error: error }));
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
    this.props.history.push({
      pathname: "/checkout"
    });
  };
  isPurchaseable = ingredients => {
    const purchaseable = Object.values(ingredients).reduce(
      (total, cost) => total + cost,
      0
    );
    return purchaseable > 0;
  };
  updateIngredientHandler = (type, count, totalPrice) => {
    const ingredients = { ...this.state.ingredients };
    ingredients[type] = count;
    this.setState({ ingredients, totalPrice });
    this.updatePurchaseable(ingredients);
  };
  render() {
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? (
      <p> Error in loading the ingredient </p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Hoc>
          <Burger ingredients={this.props.ings} />
          <BurgerControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            purchaseable={this.isPurchaseable(this.props.ings)}
            disabled={disabledInfo}
            ordernow={this.purchaseModelHandler}
          />
        </Hoc>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.props.totalPrice}
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

const mapStateToProps = state => ({
  ings: state.ingredients,
  totalPrice: state.totalPrice
});
const mapDispatchToProps = dispatch => ({
  onAddIngredient: ingredientName =>
    dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
  onRemoveIngredient: ingredientName =>
    dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
);
