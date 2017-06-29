import React, { PureComponent } from "react";
import Container from "./styled/container-ticker-prices";
import Text from "./styled/text-ticker";
import Indicator from "./styled/indicator-ticker";

export default class Ticker extends PureComponent {
  render() {
    const { ticker, color } = this.props;

    return (
      <Container>
        <Text>{ticker.toUpperCase()}</Text>
        <Indicator color={color} />
      </Container>
    );
  }
}
