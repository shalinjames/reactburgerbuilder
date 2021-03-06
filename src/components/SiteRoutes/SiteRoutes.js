import React from "react";
import { Route, Switch } from "react-router-dom";
import BurgerBuilder from "../../containers/BurgerBuilder/BurgerBuilder";
import Checkout from "../../containers/Checkout/Checkout";
import Orders from "../../containers/Orders/Orders";
import Auth from "../../containers/Auth/Auth";
import Logout from "../../containers/Auth/Logout/Logout";

const siteRoutes = props => {
  return (
    <Switch>
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" exact component={Orders} />
      <Route path="/auth" component={Auth} />
      <Route path="/logout" component={Logout} />
      <Route path="/" exact component={BurgerBuilder} />
    </Switch>
  );
};

export default siteRoutes;
