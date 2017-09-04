import React, { Component } from "react";
import styled from "styled-components/native";
import Swipeable from "react-native-swipeable";
import Stats from "./stats-token-price";
import Ticker from "./ticker-prices";
import Container from "./styled/container-token-prices";
import { formatPrice } from "./styled/text-token-stat";
import { SmoothLine } from "react-native-pathjs-charts";
import chartOptions from "../config/options-line-chart";
import { currencyColors } from "../config/currencies";
import numeral from "numeral";
import { observer } from "mobx-react/native";

const InfoContainer = styled.View``;
const ChartContainer = styled.View``;

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
    const oldestDP = this.props.data.historical[0];
    const newestDP = this.props.data.historical[
      this.props.data.historical.length - 1
    ];

    const percentChange =
      (newestDP.close - oldestDP.close) / oldestDP.close * 100;

    return (
      <Swipeable
        rightButtonWidth={100}
        rightButtons={[
          <Stats key={0} high={newestDP.high} low={newestDP.low} />,
        ]}
      >
        <Container>
          <InfoContainer>
            <Ticker
              ticker={this.props.data.symbol}
              color={currencyColors[this.props.data.symbol] || "#333333"}
            />
            <Price>
              {formatPrice(
                this.props.data.historical[
                  this.props.data.historical.length - 1
                ].close
              )}
            </Price>
            <Changes positive={percentChange > 0}>
              {percentChange > 0 && "+"}
              {numeral(percentChange).format("0.00")}%
            </Changes>
          </InfoContainer>
          <ChartContainer>
            <SmoothLine
              data={[
                this.props.data.historical.slice().map((x, y) => {
                  return { x: x.close, y };
                }),
              ]}
              options={chartOptions(
                currencyColors[this.props.data.symbol] || "#333333"
              )}
              xKey="x"
              yKey="y"
            />
          </ChartContainer>
        </Container>
      </Swipeable>
    );
  }
}
