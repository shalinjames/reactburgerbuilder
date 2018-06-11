import * as actionsTypes from "./actionsTypes";
import axios from "../../../../services/axios-orders";

const appendToken = (url, token) => `${url}?auth=${token}`;

export const purchaseSuccess = responseData => ({
  type: actionsTypes.PURCHASE_SUCCESS,
  orderData: responseData
});

export const purchaseError = error => ({
  type: actionsTypes.PURCHASE_FAILURE,
  error
});

const purchaseLoading = () => ({
  type: actionsTypes.PURCHASE_LOADING
});

export const purchase = (order, token) => {
  return dispatch => {
    dispatch(purchaseLoading());
    return axios
      .post(appendToken("/orders.json", token), order)
      .then(response => {
        dispatch(purchaseSuccess({ id: response.data.name, ...order }));
      })
      .catch(error => {
        dispatch(purchaseError(error));
      });
  };
};

const parseResponseOrders = responseOrders => {
  const orders = [];
  Object.keys(responseOrders).reduce((orders, orderKey) => {
    orders.push({ ...responseOrders[orderKey], id: orderKey });
    return orders;
  }, orders);
  return orders;
};

const ordersLoading = () => ({
  type: actionsTypes.ORDERS_LOADING
});

export const setOrders = orders => ({
  type: actionsTypes.SET_ORDERS,
  orders
});

const showError = error => ({
  type: actionsTypes.SHOW_ERROR,
  error
});

export const initOrders = token => {
  return dispatch => {
    dispatch(ordersLoading());
    return axios
      .get(appendToken("/orders.json", token))
      .then(res => {
        const orders = parseResponseOrders(res.data);
        dispatch(setOrders(orders));
      })
      .catch(error => {
        dispatch(showError(error));
      });
  };
};
