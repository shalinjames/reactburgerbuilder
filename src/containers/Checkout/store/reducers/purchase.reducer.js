import * as actionsTypes from "../actions/actionsTypes";
import * as utils from "./purchase.reducer.util";

const intialState = {
  orders: [],
  loading: false,
  redirect: false,
  ordersloading: false,
  error: null
};

export const purchaseReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionsTypes.PURCHASE_SUCCESS:
      return utils.purchaseSucces(state, action);
    case actionsTypes.PURCHASE_FAILURE:
      return utils.purchaseFailure(state, action);
    case actionsTypes.PURCHASE_LOADING:
      return utils.purchaseLoading(state, action);
    case actionsTypes.SET_ORDERS:
      return utils.setOrders(state, action);
    case actionsTypes.ORDERS_LOADING:
      return utils.ordersLoading(state, action);
    case actionsTypes.SHOW_ERROR:
      return utils.showError(state, action);
    default:
      return state;
  }
};
