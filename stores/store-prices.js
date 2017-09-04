import _ from "lodash";
import { observable, computed, action, autorun } from "mobx";
import { AsyncStorage, InteractionManager } from "react-native";
import ReconnectingWebsocket from "reconnecting-websocket";
import { create, persist } from "mobx-persist";
import Reactotron from "reactotron-react-native";
import { currencyColors, currencyData, CURRENCIES } from "../config/currencies";
import cc from "cryptocompare";

export default class PricesStore {
  @persist("object")
  @observable
  portfolio = {};

  @persist
  @observable
  period = "day";

  @observable isLoaded = false;

  @persist
  @observable
  error = null;

  @persist
  @observable
  baseCurrency = "USD";

  @persist
  @observable
  refreshInterval = 1;

  @persist("object")
  @observable
  priceData = {};

  refreshHandle = null;

  /* actions */

  @action
  fetchData = async () => {
    console.log("fetching");
    for (let coin of CURRENCIES) {
      const data = await cc.histoHour(coin.symbol, this.baseCurrency, {
        limit: 24,
      });
      console.log("fetched", data);
      this.priceData[coin.symbol] = data;
    }
  };

  @action
  watchData = () => {
    this.refreshHandle = setInterval(this.fetchData, 1000);
  };

  @action
  setRefreshInterval = interval => {
    this.refreshInterval = interval;

    clearInterval(this.refreshHandle);

    this.watchData();
  };

  @action
  selectPeriod = period => {
    this.period = period;
    this.fetchData();
  };

  @action
  hydrate = async () => {
    const pour = create({
      storage: AsyncStorage,
    });

    Object.keys(this).forEach(key => {
      pour(key, this);
    });
  };

  constructor() {
    // Rehydrate store from persisted data
    this.hydrate().then(() => {
      this.fetchData()
        .then(() => {
          this.isLoaded = true;
          this.error = null;
        })
        .catch(console.error);
    });
  }
}
