import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../services/axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Inupt from "../../../components/UI/Input/Input";
import ContactForm from "./ContactForm";

class ContactData extends Component {
  state = {
    loading: false,
    orderForm: ContactForm,
    formValid: false
  };
  checkInputValidity(value, rules = {}) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }
  formValidity(updatedOrderForm) {
    return Object.keys(updatedOrderForm).every(
      inputElement => updatedOrderForm[inputElement].valid
    );
  }
  inputElementClickedHandler = (event, id) => {
    const inputNewValue = event.target.value;
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedInputElementValue = { ...updatedOrderForm[id] };
    updatedInputElementValue.value = inputNewValue;
    updatedInputElementValue.valid = this.checkInputValidity(
      inputNewValue,
      updatedInputElementValue.validation
    );
    updatedInputElementValue.touched = true;
    updatedOrderForm[id] = updatedInputElementValue;

    const formValid = this.formValidity(updatedOrderForm);
    this.setState({ orderForm: updatedOrderForm, formValid });
  };

  getFormInfo() {
    const orderForm = {};
    return Object.keys(this.state.orderForm).reduce(
      (orderForm, inputElementId) => {
        orderForm[inputElementId] = this.state.orderForm[inputElementId].value;
        return orderForm;
      },
      orderForm
    );
  }
  contactDataClicked = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: this.getFormInfo()
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
    const orderForm = [];
    for (let element in this.state.orderForm) {
      const props = this.state.orderForm[element];
      orderForm.push(
        <Inupt
          key={element}
          elementType={props.elementType}
          elementDefaultProps={props.elementDefaultProps}
          label={props.elementLabel}
          invalid={!props.valid}
          touched={props.touched}
          changed={event => this.inputElementClickedHandler(event, element)}
        />
      );
    }
    let contactFrom = (
      <form>
        <h2>Enter contact data.</h2>
        {orderForm}
        <Button
          btnType="Success"
          disabled={!this.state.formValid}
          clicked={event => this.contactDataClicked(event)}
        >
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

const mapStateToProps = state => ({
  ingredients: state.ingredients,
  price: state.totalPrice
});
export default connect(mapStateToProps)(ContactData);
