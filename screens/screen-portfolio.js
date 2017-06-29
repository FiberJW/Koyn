// @flow
import React, { Component } from "react";
import styled from "styled-components/native";
import colors from "../config/colors";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.comet};
  justify-content: center;
  align-items: center;
`;

const Header = styled.Text`
  font-family: Shanti;
  text-align: center;
  font-size: 36px;
  color: white;
`;

const Description = styled.Text`
  margin-horizontal: 16px;
  margin-top: 16px;
  font-family: ShareTechMono;
  text-align: center;
  font-size: 24px;
  color: ${colors.halfWhite};
`;

export default class PortfolioScreen extends Component {
  static navigationOptions = {
    tabBarLabel: "portfolio"
  };

  render() {
    return (
      <Container>
        <Header>oops..</Header>
        <Description>
          you just tried to access our portfolio feature.{"\n"}
          stay tuned for this feature in an upcoming update.
        </Description>
      </Container>
    );
  }
}
