import styled from "styled-components/native";
import colors from "../../config/colors";

export default styled.View`
  padding: 8px;
  background-color: ${({ focused }) =>
    focused ? colors.halfWhite : "transparent"};
  border-radius: 24px;
`;
