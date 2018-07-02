import { updateObject } from "../../../../store/reducers/reducer.utils";

const INGREDIENTS_PRICE = {
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.7,
  salad: 0.5
};

export const addIngredient = (state, action) =>
  updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    },
    totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
    building: true
  });

export const removeIngredient = (state, action) =>
  updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    },
    totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
    building: true
  });

export const setIngredients = (state, action) =>
  updateObject(state, {
    ingredients: { ...action.ingredients },
    error: false,
    building: false
  });

export const fetchError = (state, action) =>
  updateObject(state, { error: true });
