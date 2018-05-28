import React, { Component } from "react";

import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../services/axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    loading: false
  };
  componentWillMount() {}
  contactDataClicked = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "Shalin James",
        address: {
          street: "Test street",
          zipCode: "561222",
          country: "India"
        },
        email: "testuser@test.com",
        mobile: "22554488648"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };
  render() {
    let contactFrom = (
      <form>
        <h2>Enter contact data.</h2>
        <input
          type="text"
          className={classes.Input}
          name="name"
          placeholder="Name"
        />
        <input
          type="text"
          className={classes.Input}
          name="email"
          placeholder="Email"
        />
        <input
          type="text"
          className={classes.Input}
          name="mobile"
          placeholder="Mobile Num"
        />
        <input
          type="text"
          className={classes.Input}
          name="street"
          placeholder="Street"
        />
        <input
          type="text"
          className={classes.Input}
          name="zipcode"
          placeholder="Zipcode"
        />
        <input
          type="text"
          className={classes.Input}
          name="country"
          placeholder="Country"
        />
        <Button btnType="Success" clicked={this.contactDataClicked}>
          Continue
        </Button>
      </form>
    );
    return (
      <div className={classes.ContactData}>
        {this.state.loading ? <Spinner /> : contactFrom}
      </div>
    );
  }
}

export default ContactData;
