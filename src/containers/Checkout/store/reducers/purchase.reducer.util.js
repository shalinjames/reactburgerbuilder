import { updateObject } from "../../../../store/reducers/reducer.utils";

export const purchaseSucces = (state, action) =>
  updateObject(state, {
    loading: false,
    redirect: true,
    orders: [...state.orders, { ...action.orderData }]
  });

export const purchaseFailure = (state, action) =>
  updateObject(state, {
    loading: false
  });

export const purchaseLoading = (state, action) =>
  updateObject(state, {
    loading: true
  });

export const setOrders = (state, action) =>
  updateObject(state, {
    ordersloading: false,
    orders: [...action.orders]
  });

export const ordersLoading = (state, action) =>
  updateObject(state, { ordersloading: true });

export const showError = (state, action) =>
  updateObject(state, { error: action.error });
