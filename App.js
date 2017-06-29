/**
 * @flow
 */

import React, { Component } from "react";
import { AppLoading, Font } from "expo";
import MainTabNavigator from "./navigation/tab-navigator-main";
import { Provider } from "mobx-react/native";
import PricesStore from "./stores/store-prices";
import Sentry from "sentry-expo";

if (!global.__DEV__) {
  Object.keys(console).forEach(methodName => {
    console[methodName] = () => {
      /* noop */
    };
  });

  Sentry.config(
    "https://51de0f3f37624e6093fc920f82db300e@sentry.io/185377"
  ).install();
}

export default class App extends Component {
  stores = {};

  componentDidMount() {
    Font.loadAsync({
      Shanti: require("./assets/fonts/Shanti.ttf"),
      ShareTechMono: require("./assets/fonts/ShareTechMono.ttf")
    }).then(() => {
      this.stores = { prices: new PricesStore() };
      this.setState({ loaded: true });
    });
  }

  state = {
    loaded: false
  };

  render() {
    return this.state.loaded
      ? <Provider {...this.stores}>
          <MainTabNavigator />
        </Provider>
      : <AppLoading />;
  }
}
