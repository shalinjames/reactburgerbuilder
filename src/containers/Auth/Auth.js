import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.css";
import authForm from "./Auth.form";
import { auth } from "./store/actions/actions";

class Auth extends Component {
  state = {
    loginForm: authForm,
    loading: false,
    formValid: false,
    isSignUp: false
  };
  loginClicked = event => {
    event.preventDefault();
    const { email, password } = this.state.loginForm;
    console.log("Login form Clicked!", this.state.loginForm);
    this.props.authenticate(email.value, password.value, this.state.isSignUp);
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

  inputElementChangedHandler = (event, id) => {
    const inputNewValue = event.target.value;
    const updatedLoginForm = { ...this.state.loginForm };
    const updatedInputElementValue = { ...updatedLoginForm[id] };
    updatedInputElementValue.value = inputNewValue;
    updatedInputElementValue.valid = this.checkInputValidity(
      inputNewValue,
      updatedInputElementValue.validation
    );
    updatedInputElementValue.touched = true;
    updatedLoginForm[id] = updatedInputElementValue;

    const formValid = this.formValidity(updatedLoginForm);
    this.setState({ loginForm: updatedLoginForm, formValid });
  };
  toggleSigninLogin = event => {
    event.preventDefault();
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };
  render() {
    const loginForm = [];
    for (let element in this.state.loginForm) {
      const props = this.state.loginForm[element];
      loginForm.push(
        <Input
          key={element}
          elementType={props.elementType}
          elementDefaultProps={props.elementDefaultProps}
          label={props.elementLabel}
          invalid={!props.valid}
          touched={props.touched}
          changed={event => this.inputElementChangedHandler(event, element)}
          value={props.value}
        />
      );
    }
    let contactFrom = (
      <form>
        <h2>Enter login credentials</h2>
        {loginForm}
        <Button
          btnType="Success"
          disabled={!this.state.formValid}
          clicked={event => this.loginClicked(event)}
        >
          {this.state.isSignUp ? "Sign Up" : "Login"}
        </Button>
        <p>
          <Button
            btnType="Danger"
            clicked={event => this.toggleSigninLogin(event)}
          >
            {this.state.isSignUp ? "Already a user" : "New user"}
          </Button>
        </p>
      </form>
    );
    return (
      <div className={classes.Auth}>
        {this.state.loading ? <Spinner /> : contactFrom}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  authenticate: (email, password, isSignUp) =>
    dispatch(auth(email, password, isSignUp))
});

export default connect(
  null,
  mapDispatchToProps
)(Auth);
