import _ from "lodash";
import { observable, computed, action } from "mobx";
import { AsyncStorage, InteractionManager } from "react-native";
import ReconnectingWebsocket from "reconnecting-websocket";
import { create, persist } from "mobx-persist";
import Reactotron from "reactotron-react-native";
import { currencyColors, currencyData } from "../config/currencies";

const API_URL = "https://api.lionshare.capital";
const WS_URL = "wss://api.lionshare.capital";

export default class PricesStore {
  @persist("object")
  @observable
  portfolio = {};

  @persist("object")
  @observable
  rateData = {};

  @persist("object")
  @observable
  marketData = {};

  @persist
  @observable
  period = "day";

  @persist
  @observable
  isLoaded = false;

  @persist
  @observable
  error = null;

  @persist
  @observable
  refreshInterval = 30;

  /* computed */

  @computed
  get rates() {
    let data;
    if (this.isLoaded) {
      data = {};
      _.map(this.rateData, (value, key) => {
        data[key] = value.slice(-1)[0];
      });
    }
    return data;
  }

  @computed
  get changes() {
    let data;
    if (this.isLoaded) {
      data = {};
      _.map(this.rateData, (value, key) => {
        const change = (value.slice(-1)[0] - value[0]) / value[0];
        data[key] = change;
      });
    }
    return data;
  }

  @computed
  get priceListData() {
    let data;
    if (this.isLoaded) {
      data = [];
      _.map(this.rateData, (value, key) => {
        const color = currencyColors[key];
        const labels = [];
        const historic = [];
        value.forEach(rate => {
          historic.push(parseFloat(rate));
          labels.push("");
        });

        data.push({
          color,
          symbol: key,
          price: this.rates[key],
          change: this.changes[key] * 100,
          chartData: {
            labels,
            datasets: [
              {
                radius: 0,
                borderColor: color,
                data: historic
              }
            ]
          },
          highestPrice: this.highestPrice(key),
          lowestPrice: this.lowestPrice(key),
          marketCap: this.marketCap(key)
        });
      });
      data = data.filter(i => currencyData(i.symbol));
    }

    Reactotron.log(data);
    return data;
  }

  /* actions */

  @action
  fetchData = async () => {
    try {
      const rateRes = await fetch(
        `${API_URL}/api/prices?period=${this.period}`
      );
      const rateData = await rateRes.json();
      this.rateData = rateData.data;

      const marketRes = await fetch(`${API_URL}/api/markets`);
      const marketData = await marketRes.json();
      this.marketData = marketData.data;

      this.isLoaded = true;
      this.error = null;
    } catch (_e) {
      if (!this.isLoaded) {
        // Only show the error if the first load fails
        this.error =
          "Error loading content, please check your connection and try again.";
      }
      setTimeout(() => {
        this.fetchData();
      }, 2000);
    }
  };

  @action
  updatePrice = message => {
    InteractionManager.runAfterInteractions(() => {
      const data = JSON.parse(message.data);
      const cryptoCurrency = data.cryptoCurrency;
      const price = parseFloat(data.price);
      if (this.isLoaded) {
        const index = this.rateData[cryptoCurrency].length - 1;
        this.rateData[cryptoCurrency][index] = price;
      }
    });
  };

  @action
  connectToWebsocket = () => {
    this.websocket = new ReconnectingWebsocket(WS_URL, [], {});
    this.websocket.addEventListener(
      "message",
      _.throttle(this.updatePrice, this.refreshInterval * 1000)
    );
  };

  @action
  setRefreshInterval = interval => {
    this.refreshInterval = interval;
    this.connectToWebsocket();
  };

  @action
  selectPeriod = period => {
    this.period = period;
    this.fetchData();
  };

  highestPrice = currency => {
    let highestPrice = 0.0;
    if (this.isLoaded) {
      highestPrice = Math.max(...this.rateData[currency]);
    }
    return highestPrice;
  };

  lowestPrice = currency => {
    const lowestPrice = 0.0;
    if (this.isLoaded) {
      return Math.min(...this.rateData[currency]);
    }
    return lowestPrice;
  };

  marketCap = currency => {
    const marketCap = 0.0;
    if (this.isLoaded) {
      return this.marketData[currency];
    }
    return marketCap;
  };

  convert = (amount, currency) => {
    return amount * this.rates[currency];
  };

  change = (amount, currency) => {
    return this.convert(amount, currency) * this.changes[currency];
  };

  @action
  hydrate = async () => {
    const pour = create({
      storage: AsyncStorage
    });

    Object.keys(this).forEach(key => {
      pour(key, this);
    });
  };

  constructor() {
    // Rehydrate store from persisted data
    this.hydrate().then(() => {
      this.fetchData();
      this.connectToWebsocket();
    });
  }
}
