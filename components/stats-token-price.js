import React, { PureComponent } from "react";
import StatLabel from "./styled/text-label-token-stat";
import Container from "./styled/container-stats-token-price";
import Row from "./styled/container-stat-labels-and-values";
import LabelsContainer from "./styled/container-stat-labels";
import ValuesContainer from "./styled/container-stat-values";
import Stat, { formatPrice, formatMarketCap } from "./styled/text-token-stat";

export default class TokenPriceState extends PureComponent {
  render() {
    const { high, low, market } = this.props;

    return (
      <Container>
        <Row>
          <LabelsContainer>
            <StatLabel>H</StatLabel>
            <StatLabel>L</StatLabel>
            <StatLabel>M</StatLabel>
          </LabelsContainer>
          <ValuesContainer>
            <Stat>
              {formatPrice(high)}
            </Stat>
            <Stat>
              {formatPrice(low)}
            </Stat>
            <Stat>
              {formatMarketCap(market)}
            </Stat>
          </ValuesContainer>
        </Row>
      </Container>
    );
  }
}
