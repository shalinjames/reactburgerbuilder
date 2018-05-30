import React, { Component } from "react";

import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../services/axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Inupt from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    loading: false,
    orderForm: {
      name: this.configInputElement("text", "Name", "name", "Enter Full Name"),
      street: this.configInputElement(
        "text",
        "Street",
        "street",
        "Enter Street Number",
        ""
      ),
      zipCode: this.configInputElement(
        "text",
        "Zipcode",
        "zipcode",
        "Enter Zipcode",
        "",
        { minLength: 6, maxLength: 6 }
      ),
      country: this.configInputElement(
        "text",
        "Country",
        "country",
        "Enter a Country Name",
        ""
      ),
      email: this.configInputElement(
        "email",
        "E-mail",
        "email",
        "Enter a Valid E-mail Address",
        ""
      ),
      mobile: this.configInputElement(
        "text",
        "Mobile",
        "mobile",
        "Enter a Valid Mobile Number",
        ""
      ),
      deliveryMethod: this.configSelectElement(
        [
          { value: "quickest", displayValue: "15mins Delivery" },
          { value: "fasetest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" }
        ],
        "deliverymethod",
        "",
        ""
      )
    },
    formValid: false
  };
  configSelectElement(options, name, value) {
    return {
      name,
      elementType: "select",
      elementDefaultProps: { options },
      value,
      ...this.configValidationRules({ requried: false })
    };
  }
  configInputElement(...args) {
    const [type, placeholder, name, label, value, validation] = args;
    return {
      elementType: "input",
      elementLabel: label,
      elementDefaultProps: {
        type,
        placeholder,
        name
      },
      value,
      ...this.configValidationRules(validation)
    };
  }
  configValidationRules(rules = {}) {
    return {
      validation: {
        required: rules.required || true,
        minLength: rules.minLength,
        maxLength: rules.maxLength
      },
      valid: rules.valid || false,
      touched: false
    };
  }
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

export default ContactData;
