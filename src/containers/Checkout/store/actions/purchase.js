import * as actionsTypes from "./actionsTypes";
import axios from "../../../../services/axios-orders";

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

export const purchase = order => {
  return dispatch => {
    dispatch(purchaseLoading());
    return axios
      .post("/orders.json", order)
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

export const initOrders = () => {
  return dispatch => {
    dispatch(ordersLoading());
    return axios
      .get("/orders.json")
      .then(res => {
        const orders = parseResponseOrders(res.data);
        dispatch(setOrders(orders));
      })
      .catch(error => {
        this.showLoader(false);
      });
  };
};
