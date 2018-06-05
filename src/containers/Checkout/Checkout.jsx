import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

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
    let summary = <Redirect to="/" />;
    if (this.props.ingredients && !this.props.redirect) {
      summary = (
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
    return summary;
  }
}

const mapStateToProps = state => ({
  ingredients: state.burger.ingredients,
  redirect: state.purchase.redirect
});
export default connect(mapStateToProps)(Checkout);
