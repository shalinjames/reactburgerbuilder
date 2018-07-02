import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../../../store/reducers/reducer.utils";

const initState = {
  authData: {},
  loading: false,
  error: false,
  authRedirectPath: "/"
};

const authLogout = state => {
  return updateObject(state, initState);
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        authData: action.loginData,
        loading: false
      });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.AUTH_START:
      return updateObject(state, { loading: true });
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.SET_AUTH_REDIRECT_URL:
      return updateObject(state, { authRedirectPath: action.path });
    default:
      return state;
  }
};
