import React, { Component } from "react";
import axios from "../../services/axios-orders";
import Hoc from "../../higherordercomps/Hoc/hoc";

import Spinner from "../../components/UI/Spinner/Spinner";
import Order from "../../components/Burger/Order/Order";

class Orders extends Component {
  state = {
    orders: [],
    loading: false
  };
  showLoader(loading = false) {
    this.setState({ loading });
  }
  parseResponseOrders(responseOrders) {
    const orders = [];
    Object.keys(responseOrders).reduce((orders, orderKey) => {
      orders.push({ ...responseOrders[orderKey], id: orderKey });
      return orders;
    }, orders);
    return orders;
  }
  componentDidMount() {
    this.showLoader(true);
    axios
      .get("/orders.json")
      .then(res => {
        this.showLoader(false);
        const orders = this.parseResponseOrders(res.data);
        this.setState({ orders });
        console.info(res.data, this.state.orders);
      })
      .catch(error => {
        this.showLoader(false);
      });
  }
  render() {
    let orders = this.state.orders.map(order => {
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      );
    });
    return <div>{this.state.loading ? <Spinner /> : orders}</div>;
  }
}

export default Orders;
