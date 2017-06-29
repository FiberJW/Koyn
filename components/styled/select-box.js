import styled from "styled-components/native";
import colors from "../../config/colors";

export default styled.TouchableOpacity`
  border-width: 0.5px;
  border-color: ${colors.halfWhite};
  background-color: ${({ selected }) =>
    selected ? colors.halfWhite : "transparent"};
  flex: 1;
  justify-content: center;
  align-items: center;
`;
