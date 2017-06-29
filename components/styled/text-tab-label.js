import styled from "styled-components/native";
import colors from "../../config/colors";

export default styled.Text`
  fontFamily: ShareTechMono;
  color: ${({ focused }) => (focused ? "white" : colors.halfWhite)};
  fontSize: 24px;
`;
