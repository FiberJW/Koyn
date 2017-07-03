// @flow
import React, { Component } from "react";
import styled from "styled-components/native";
import { inject, observer } from "mobx-react/native";
import colors from "../config/colors";
import PieChart from "react-native-pie-chart";
import { formatPrice } from "../components/styled/text-token-stat";
import { Dimensions } from "react-native";
import Ticker from "../components/ticker-prices";

const Row = styled.View`
  margin: 16px;
  flex-direction: row;
  justify-content: space-between;
`;
const Kon = styled.ScrollView`
  background-color: ${colors.comet};
  flex: 1;
`;
const Input = styled.TextInput`
  color: white;
  flex: 1;
  text-align: right;
  border-bottom-width: 0.5px;
  border-bottom-color: ${colors.halfWhite};
`;

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

const Kol = styled.View`
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
  font-size: 18px;
  margin-left: 8px;
`;

const Yuren = styled.View`
  height: ${Dimensions.get("window").width}px;
  justify-content: space-around;
  align-items: center;
`;

const TotalPrice = styled.Text`
  font-family: Shanti;
  color: white;
  font-size: 36px;
  margin-left: 8px;
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
    const series = this.props.prices.priceListData
      .filter(y => {
        return this.props.prices.portfolio[y.symbol] > 0;
      })
      .map(k => {
        const name = k.symbol;
        const amount = this.props.prices.portfolio[name];
        const priceAmount = k.price * amount;

        sliceColor.push(k.color);
        changes.push(k.change);
        return priceAmount;
      });

    const totalAmount = series.length ? series.reduce((s, v) => s + v) : 0;

    return __DEV__ && this.props.prices.isLoaded // eslint-disable-line no-undef
      ? <Kon contentContainerStyle={{ alignItems: "center" }}>
          <Yuren>
            <TotalPrice>
              {formatPrice(totalAmount)}
            </TotalPrice>
            <PieChart
              chart_wh={Dimensions.get("window").width * 0.75}
              series={series}
              sliceColor={sliceColor}
              doughnut
              coverRadius={0.95}
              coverFill={colors.comet}
            />
          </Yuren>
          {this.props.prices.priceListData.map(s => {
            if (!(s.symbol in this.props.prices.portfolio)) {
              this.props.prices.portfolio[s.symbol] = 0.0;
            }
            return (
              <Row key={s.symbol}>
                <Ticker ticker={s.symbol} color={s.color || "#333333"} />
                <PriceAmount>
                  {formatPrice(s.price * this.props.prices.portfolio[s.symbol])}
                </PriceAmount>
                <Kol>
                  <Input
                    keyboardType="numeric"
                    value={this.props.prices.portfolio[s.symbol].toString()}
                    onChangeText={text => {
                      const value = parseFloat(text).toFixed(
                        Math.max(
                          2,
                          (text.toString().split(".")[1] || []).length
                        )
                      );
                      if (!isNaN(parseFloat(value)) && isFinite(value)) {
                        this.props.prices.portfolio[s.symbol] = value;
                      } else if (text.length === 0) {
                        this.props.prices.portfolio[s.symbol] = 0.0;
                      }
                    }}
                    underlineColorAndroid="transparent"
                  />
                  <Underline />
                </Kol>
              </Row>
            );
          })}
        </Kon>
      : <Container>
          <Header>oops..</Header>
          <Description>
            you just tried to access our portfolio feature.{"\n"}
            stay tuned for this feature in an upcoming update.
          </Description>
        </Container>;
  }
}
