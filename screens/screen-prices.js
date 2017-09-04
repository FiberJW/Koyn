// @flow
import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import colors from "../config/colors";
import Token from "../components/token-prices";
import { observer, inject } from "mobx-react/native";
import _ from "lodash";

@inject("prices")
@observer
export default class PricesScreen extends Component {
  static navigationOptions = {
    tabBarLabel: "prices",
  };

  state = { refreshing: false };

  render() {
    const { priceData } = this.props.prices;

    const prices = _.map(priceData, (values, key) => {
      return {
        symbol: key,
        historical: values.slice(),
      };
    });

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.comet,
        }}
      >
        {this.props.prices.isLoaded
          ? <FlatList
              keyExtractor={item => item.symbol}
              data={prices}
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
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" />
            </View>}
      </View>
    );
  }
}
