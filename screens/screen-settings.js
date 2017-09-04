// @flow
import React, { Component } from "react";
import { observer, inject } from "mobx-react/native";
import Box from "../components/styled/select-box";
import Container from "../components/styled/container-settings-screen";
import Label from "../components/styled/text-label-settings";
import Text from "../components/styled/text-select-title";
import SelectContainer from "../components/styled/container-select";
import Icon from "../components/styled/icon-tab-bar";

@inject("prices")
@observer
export default class SettingsScreen extends Component {
  static navigationOptions = {
    tabBarLabel: null,
    tabBarIcon: ({ focused, tintColor }) =>
      <Icon
        focused={focused}
        tintColor={tintColor}
        source={require("../assets/images/icon-settings.png")}
      />,
  };
  render() {
    return (
      <Container>
        <Label>time interval</Label>
        <SelectContainer>
          {["hour", "day", "week", "month", "year"].map((period, i) =>
            <Box
              onPress={() => this.props.prices.selectPeriod(period)}
              key={i}
              selected={this.props.prices.period === period}
            >
              <Text>
                {period}
              </Text>
            </Box>
          )}
        </SelectContainer>
        {/* <Label>refresh interval</Label>
        <SelectContainer>
          {[15, 30, 60, 120].map((invterval, i) =>
            <Box
              onPress={() => this.props.prices.setRefreshInterval(invterval)}
              key={i}
              selected={this.props.prices.refreshInterval === invterval}
            >
              <Text>
                {invterval}s
              </Text>
            </Box>
          )}
        </SelectContainer> */}
        <Label>native currency</Label>
        <SelectContainer>
          <Box disabled>
            <Text>USD</Text>
          </Box>
        </SelectContainer>
        <Label>data source</Label>
        <SelectContainer>
          <Box disabled>
            <Text>cryptocompare.com</Text>
          </Box>
        </SelectContainer>
      </Container>
    );
  }
}
