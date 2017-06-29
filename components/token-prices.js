import React, { Component } from "react";
import styled from "styled-components/native";
import Swipeable from "react-native-swipeable";
import Stats from "./stats-token-price";
import Ticker from "./ticker-prices";
import Container from "./styled/container-token-prices";
import { formatPrice } from "./styled/text-token-stat";
import { SmoothLine } from "react-native-pathjs-charts";
import chartOptions from "../config/options-chart";
import numeral from "numeral";
import { observer } from "mobx-react/native";

const InfoContainer = styled.View`
`;
const ChartContainer = styled.View`
`;

const Price = styled.Text`
  font-family: Shanti;
  margin-top: 8px;
  font-size: 18px;
  color: white;
`;

const Changes = styled.Text`
  font-family: Shanti;
  color: ${({ positive }) => (positive ? "#41B762" : "#FF4954")};
  font-size: 14px;
`;

@observer
export default class Token extends Component {
  render() {
    return (
      <Swipeable
        rightButtonWidth={100}
        rightButtons={[
          <Stats
            key={0}
            market={this.props.data.marketCap}
            high={this.props.data.highestPrice}
            low={this.props.data.lowestPrice}
          />
        ]}
      >
        <Container>
          <InfoContainer>
            <Ticker
              ticker={this.props.data.symbol}
              color={this.props.data.color || "#333333"}
            />
            <Price>{formatPrice(this.props.data.price)}</Price>
            <Changes positive={this.props.data.change > 0}>
              {this.props.data.change > 0 && "+"}
              {numeral(this.props.data.change).format("0.00")}%
            </Changes>
          </InfoContainer>
          <ChartContainer>
            <SmoothLine
              data={[
                this.props.data.chartData.datasets[0].data
                  .slice()
                  .map((x, y) => ({ x, y }))
              ]}
              options={chartOptions(this.props.data.color || "#333333")}
              xKey="x"
              yKey="y"
            />
          </ChartContainer>
        </Container>
      </Swipeable>
    );
  }
}
