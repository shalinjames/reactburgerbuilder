import React, { Component } from "react";
import Layout from "./higherordercomps/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerBuilder>Test if the text appears</BurgerBuilder>
      </Layout>
    );
  }
}

export default App;
