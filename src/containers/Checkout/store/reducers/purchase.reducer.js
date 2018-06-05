import * as actionsTypes from "../actions/actionsTypes";

const intialState = {
  orders: [],
  loading: false,
  redirect: false,
  ordersloading: false
};

export const purchaseReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionsTypes.PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: true,
        orders: [...state.orders, { ...action.orderData }]
      };
    case actionsTypes.PURCHASE_FAILURE:
      return {
        ...state,
        loading: false
      };
    case actionsTypes.PURCHASE_LOADING:
      return {
        ...state,
        loading: true
      };
    case actionsTypes.SET_ORDERS:
      return {
        ...state,
        ordersloading: false,
        orders: [...action.orders]
      };
    case actionsTypes.ORDERS_LOADING:
      return {
        ...state,
        ordersloading: true
      };
    default:
      return state;
  }
};
