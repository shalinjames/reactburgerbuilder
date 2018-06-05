import * as actionTypes from "../actions/actionsTypes";

const INGREDIENTS_PRICE = {
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.7,
  salad: 0.5
};

const initialstate = {
  ingredients: null,
  totalPrice: 4,
  error: true
};

export const burgerReducer = (state = initialstate, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: { ...action.ingredients },
        error: false
      };
    case actionTypes.FETCH_INGREDIENTS_ERROR:
      return {
        ...state,
        error: true
      };
    default:
      return { ...state };
  }
};

export default burgerReducer;
