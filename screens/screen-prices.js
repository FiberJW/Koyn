// @flow
import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import colors from "../config/colors";
import Token from "../components/token-prices";
import { observer, inject } from "mobx-react/native";

@inject("prices")
@observer
export default class PricesScreen extends Component {
  static navigationOptions = {
    tabBarLabel: "prices"
  };

  state = { refreshing: false, loaded: false };

  componentDidMount() {
    const load = setInterval(() => {
      if (this.props.prices.isLoaded) {
        setTimeout(() => this.setState({ loaded: true }), 1000);
        clearInterval(load);
      }
    }, 100);
  }

  render() {
    const { priceListData } = this.props.prices;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.comet
        }}
      >
        {this.state.loaded
          ? <FlatList
              keyExtractor={item => item.symbol}
              data={priceListData}
              onRefresh={() => {
                this.setState({ refreshing: true });
                this.props.prices.fetchData().then(() => {
                  this.setState({ refreshing: false });
                });
              }}
              refreshing={this.state.refreshing}
              renderItem={({ item }) => <Token data={item} />}
            />
          : <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ActivityIndicator size="large" />
            </View>}
      </View>
    );
  }
}
