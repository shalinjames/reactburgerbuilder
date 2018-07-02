import * as actionTypes from "../actions/actionsTypes";
import * as utils from "./burger.reducer.utils";

const initialstate = {
  ingredients: null,
  totalPrice: 4,
  error: true,
  building: false
};

export const burgerReducer = (state = initialstate, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return utils.addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return utils.removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return utils.setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_ERROR:
      return utils.fetchError(state, action);
    default:
      return { ...state };
  }
};

export default burgerReducer;
