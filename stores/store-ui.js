import { AsyncStorage } from "react-native";
import { observable, action, autorun } from "mobx";
import { CURRENCIES } from "../config/currencies";
import { SORT_TYPES } from "../config/sort-by";

const UI_STORE_KEY = "UI_STORE_KEY";
const AVAILABLE_VIEWS = ["prices", "portfolio", "settings"];

export default class Ui {
  @observable view = AVAILABLE_VIEWS[0];
  @observable visibleCurrencies = CURRENCIES.map(currency => currency.symbol);
  @observable sortBy = SORT_TYPES.marketCap;
  @observable dockItemVisible = true;
  @observable launchOnStartup = false;

  /* actions */

  @action
  changeView(view) {
    if (AVAILABLE_VIEWS.includes(view)) {
      this.view = view;
    }
  }

  @action
  toggleCurrency = currency => {
    if (this.visibleCurrencies.includes(currency)) {
      this.visibleCurrencies.remove(currency);
    } else {
      this.visibleCurrencies.push(currency);
    }
  };

  @action
  setSortBy = sortBy => {
    this.sortBy = sortBy;
  };

  @action
  toggleCurrenciesAll = () => {
    this.toggleCurrenciesNone(); // Clear first
    CURRENCIES.forEach(currency =>
      this.visibleCurrencies.push(currency.symbol)
    );
  };

  @action
  toggleCurrenciesNone = () => {
    this.visibleCurrencies = [];
  };

  @action
  setLaunchOnStartup = launchOnStartup => {
    this.launchOnStartup = launchOnStartup;
  };

  @action
  setDockItemVisible = visible => {
    this.dockItemVisible = visible;
  };

  @action
  fromJSON = jsonData => {
    const parsed = JSON.parse(jsonData);
    this.view = parsed.view;
    this.visibleCurrencies.replace(parsed.visibleCurrencies);

    const setIfDefined = key => {
      if (typeof parsed[key] !== "undefined") {
        this[key] = parsed[key];
      }
    };

    setIfDefined("dockItemVisible");
    setIfDefined("sortBy");
    setIfDefined("launchOnStartup");
  };

  /* other */

  toObject = () => {
    return {
      view: this.view,
      visibleCurrencies: this.visibleCurrencies,
      sortBy: this.sortBy,
      launchOnStartup: this.launchOnStartup,
      dockItemVisible: this.dockItemVisible
    };
  };

  toJSON = () => JSON.stringify(this.toObject());

  constructor() {
    // Rehydrate store from persisted data
    AsyncStorage.getItem(UI_STORE_KEY).then(data => {
      if (data) this.fromJSON(data);

      // Persist store to AsyncStorage
      autorun(() => {
        AsyncStorage.setItem(UI_STORE_KEY, this.toJSON());
      });
    });
  }
}
