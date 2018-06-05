import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import Layout from "./higherordercomps/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import { burgerReducer } from "./store/reducers/reducer";

class App extends Component {
  render() {
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
      burgerReducer,
      composeEnhancers(applyMiddleware(thunk))
    );
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" exact component={Orders} />
              <Route path="/" exact component={BurgerBuilder} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
