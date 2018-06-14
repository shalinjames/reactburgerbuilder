import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.config";

import Layout from "./higherordercomps/Layout/Layout";
import SiteRoutes from "./components/SiteRoutes/SiteRoutes";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <SiteRoutes />
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
