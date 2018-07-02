import * as actionTypes from "./actionTypes";

import axios from "axios";

const authInstance = axios.create({
  baseURL: "https://www.googleapis.com/identitytoolkit/v3/relyingparty"
});

export const success = loginData => ({
  type: actionTypes.AUTH_SUCCESS,
  loginData
});

export const failure = error => ({
  type: actionTypes.AUTH_FAIL,
  error
});

const start = () => ({
  type: actionTypes.AUTH_START
});

const getAuthURL = isSignup => {
  let URL = isSignup ? "/signupNewUser" : "/verifyPassword";
  return `${URL}?key=AIzaSyBzl6co9pk06AyIXWYxZY-z-CKB2meaVbg`;
};

export const logout = () => ({ type: actionTypes.AUTH_LOGOUT });

const authTimeout = (timeout, dispatch) => {
  setTimeout(() => dispatch(logout()), timeout * 1000);
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(start());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    return authInstance
      .post(getAuthURL(isSignup), authData)
      .then(response => {
        dispatch(success(response.data));
        dispatch(authTimeout(response.data.expiresIn, dispatch));
      })
      .catch(error => dispatch(failure(error)));
  };
};

export const setAuthRedirectURL = authRedirectPath => ({
  type: actionTypes.SET_AUTH_REDIRECT_URL,
  path: authRedirectPath
});
