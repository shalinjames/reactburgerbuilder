import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import classes from "./Checkout.css";
import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../components/Burger/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: 0
  };
  checkoutContinuedHandler = () => {
    this.props.history.push("/checkout/contact");
  };
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div className={classes.Checkout}>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={`${this.props.match.path}/contact`}
          exact
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.ingredients
});
export default connect(mapStateToProps)(Checkout);
