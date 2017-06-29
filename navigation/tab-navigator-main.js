// @flow
import { TabNavigator as tabNavigator } from "react-navigation";
import PortfolioScreen from "../screens/screen-portfolio";
import PricesScreen from "../screens/screen-prices";
import SettingsScreen from "../screens/screen-settings";
import TabBar from "./tab-bar-main";

export default tabNavigator(
  {
    Prices: { screen: PricesScreen, path: "prices" },
    Portfolio: { screen: PortfolioScreen, path: "portfolio" },
    Settings: { screen: SettingsScreen, path: "settings" }
  },
  {
    tabBarPosition: "top",
    swipeEnabled: false,
    initialRouteName: "Prices",
    tabBarComponent: TabBar
  }
);
