import * as actionTypes from "./actions";

const INGREDIENTS_PRICE = {
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.7,
  salad: 0.5
};

const initialstate = {
  ingredients: { bacon: 0, salad: 0, cheese: 0, meat: 0 },
  totalPrice: 0
};

const burgerReducer = (state = initialstate, action) => {
  let returnState = {};
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      returnState = {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
      };
      break;
    case actionTypes.REMOVE_INGREDIENT:
      returnState = {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
      };
      break;
    default:
      returnState = { ...state };
  }
  return returnState;
};

export default burgerReducer;
