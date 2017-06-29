import styled from "styled-components/native";
import colors from "../../config/colors";

export default styled.View`
  padding-horizontal: 16px;
  padding-bottom: 2px;
  background-color: ${({ focused }) =>
    focused ? colors.halfWhite : "transparent"};
  border-radius: 24px;
`;
