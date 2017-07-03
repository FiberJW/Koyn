// @flow
import React, { Component } from "react";
import styled from "styled-components/native";
import { inject, observer } from "mobx-react/native";
import colors from "../config/colors";
import _ from "lodash";
import { formatPrice } from "../components/styled/text-token-stat";
import { Dimensions, findNodeHandle, ActivityIndicator } from "react-native";
import Ticker from "../components/ticker-prices";
import { VictoryPie } from "victory-native";

const TokenContainer = styled.View`
  margin: 16px;
  flex-direction: row;
  justify-content: space-between;
`;
const Container = styled.ScrollView`
  background-color: ${colors.comet};
  flex: 1;
`;
const Input = styled.TextInput`
  color: white;
  height: 16px;
  flex: 1;
  text-align: right;
  border-bottom-width: 0.5px;
  border-bottom-color: ${colors.halfWhite};
`;

const Emoji = styled.Text`
  font-size: 64px;
  padding-vertical: 100px;
`;

const TokenAmountInputContainer = styled.View`
  flex: 1;
  margin-left: 16px;
`;
const Underline = styled.View`
  height: 0.5px;
  background-color: ${colors.halfWhite};
`;

const PriceAmount = styled.Text`
  font-family: Shanti;
  color: white;
  font-size: 16px;
  margin-left: 8px;
`;

const PieChartInputContainer = styled.View`
  height: ${Dimensions.get("window").width}px;
  justify-content: space-around;
  align-items: center;
`;

const TotalPrice = styled.Text`
  font-family: Shanti;
  color: white;
  font-size: 36px;
`;

@inject("prices")
@observer
export default class PortfolioScreen extends Component {
  static navigationOptions = {
    tabBarLabel: "portfolio"
  };

  render() {
    const sliceColor = [];
    const changes = [];
    const series = (this.props.prices.priceListData || [])
      .filter(y => {
        return parseFloat(this.props.prices.portfolio[y.symbol]) > 0;
      })
      .map(k => {
        const name = k.symbol;
        const amount = parseFloat(this.props.prices.portfolio[name]);
        const priceAmount = k.price * amount;

        sliceColor.push(k.color);
        changes.push(k.change);
        return { name, priceAmount };
      });

    const totalAmount = series.length
      ? series.map(x => x.priceAmount).reduce((s, v) => s + v)
      : 0;

    return this.props.prices.isLoaded
      ? <Container
          contentContainerStyle={{
            alignItems: "center"
          }}
          ref={c => (this.scrollView = c)}
        >
          <PieChartInputContainer>
            <TotalPrice>
              {formatPrice(totalAmount)}
            </TotalPrice>
            {totalAmount
              ? <VictoryPie
                  padding={0}
                  width={Dimensions.get("window").width * 0.7}
                  height={Dimensions.get("window").width * 0.7}
                  data={series}
                  x="name"
                  y="priceAmount"
                  style={{
                    data: {
                      fill: d =>
                        sliceColor[_.findIndex(series, o => o.name === d.name)]
                    },
                    labels: { fill: "transparent" }
                  }}
                />
              : null}
          </PieChartInputContainer>
          {this.props.prices.priceListData.map(s => {
            if (!(s.symbol in this.props.prices.portfolio)) {
              this.props.prices.portfolio[s.symbol] = "0.00";
            }
            return (
              <TokenContainer key={s.symbol}>
                <Ticker ticker={s.symbol} color={s.color || "#333333"} />
                <PriceAmount>
                  {formatPrice(s.price * this.props.prices.portfolio[s.symbol])}
                </PriceAmount>
                <TokenAmountInputContainer>
                  <Input
                    ref={c => (this[`input-${s.symbol}`] = c)}
                    keyboardType="numeric"
                    onFocus={() => {
                      if (this.scrollView) {
                        const scrollResponder = this.scrollView.root.getScrollResponder();
                        const inputHandle = findNodeHandle(
                          this[`input-${s.symbol}`]
                        );

                        setTimeout(() => {
                          scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
                            inputHandle, // The TextInput node handle
                            100, // The scroll view's bottom "contentInset" (default 0)
                            true // Prevent negative scrolling
                          );
                        }, 300);
                      }
                    }}
                    onLayout={({
                      nativeEvent: { layout: { width, height, x, y } }
                    }) => {
                      this.setState({
                        [`input-layout-${s.symbol}`]: { width, height, x, y }
                      });
                    }}
                    value={this.props.prices.portfolio[s.symbol]}
                    onChangeText={text => {
                      this.props.prices.portfolio[s.symbol] = text;
                    }}
                    underlineColorAndroid="transparent"
                  />
                  <Underline />
                </TokenAmountInputContainer>
              </TokenContainer>
            );
          })}
          <Emoji>💰</Emoji>
        </Container>
      : <Container>
          <ActivityIndicator />
        </Container>;
  }
}
