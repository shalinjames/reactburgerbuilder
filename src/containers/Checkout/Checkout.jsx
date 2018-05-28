import React, { Component } from "react";
import axios from "axios";
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
  componentWillMount() {
    const orderId = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = 0;
    for (let param of orderId.entries()) {
      if (param[0] === "totalPrice") {
        totalPrice = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients, totalPrice });
    // if (orderId) {
    //   axios
    //     .get(`https://react-burger-1d081.firebaseio.com/orders/${orderId}.json`)
    //     .then(response => {
    //       this.setState({ ingredients: response.data.ingredients });
    //     });
    // }
  }
  render() {
    return (
      <div className={classes.Checkout}>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={`${this.props.match.path}/contact`}
          exact
          render={props => {
            return (
              <ContactData
                {...props}
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default Checkout;
