// @flow
import styled from "styled-components/native";
import numeral from "numeral";

export default styled.Text`
  color: white;
  font-size: 12px;
  font-family: Shanti;
`;

export const formatPrice = (val: number) => numeral(val).format("$0,0.00");
export const formatMarketCap = (val: number) => numeral(val).format("$0,0.00a");
