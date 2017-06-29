// @flow
import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import colors from "../config/colors";
import { observer, inject } from "mobx-react/native";

const Label = styled.Text`
  font-family: ShareTechMono;
  color: white;
  font-size: 18px;
  margin-left: 16px;
  margin-vertical: 16px;
`;
const Text = styled.Text`
  font-family: ShareTechMono;
  color: white;
  font-size: 18px;
`;

const Box = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${colors.halfWhite};
  background-color: ${({ selected }) =>
    selected ? colors.halfWhite : "transparent"};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SelectContainer = styled.View`
  height: 48px;
  width: 100%;
  padding-horizontal: 16px;
  flex-direction: row;
`;

@inject("prices")
@observer
export default class SettingsScreen extends Component {
  static navigationOptions = {
    tabBarLabel: null,
    tabBarIcon: ({ focused, tintColor }) =>
      <Image
        source={require("../assets/images/icon-settings.png")}
        style={[
          {
            height: 24,
            width: 24,
            tintColor: focused ? tintColor : colors.halfWhite
          }
        ]}
      />
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.comet }}>
        <Label>time interval</Label>
        <SelectContainer>
          {["day", "month", "year"].map((period, i) =>
            <Box
              onPress={() => this.props.prices.selectPeriod(period)}
              key={i}
              selected={this.props.prices.period === period}
            >
              <Text>
                1 {period}
              </Text>
            </Box>
          )}
        </SelectContainer>
        <Label>refresh interval</Label>
        <SelectContainer>
          {[30, 60, 120].map((invterval, i) =>
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
        </SelectContainer>
      </View>
    );
  }
}
