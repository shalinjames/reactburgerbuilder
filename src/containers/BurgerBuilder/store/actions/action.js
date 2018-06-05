import axios from "../../../../services/axios-orders";

import * as actionTypes from "./actionsTypes";

export const addIngredient = ingredientName => {
  return { type: actionTypes.ADD_INGREDIENT, ingredientName };
};

export const removeIngredient = ingredientName => {
  return { type: actionTypes.REMOVE_INGREDIENT, ingredientName };
};

export const setIngredient = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  };
};

export const setFetchError = ingredients => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_ERROR,
    ingredients
  };
};

export const initIngredients = () => {
  return dispatch =>
    axios
      .get("https://react-burger-1d081.firebaseio.com/ingredients.json")
      .then(response => dispatch(setIngredient(response.data)))
      .catch(error => dispatch(setFetchError()));
};
