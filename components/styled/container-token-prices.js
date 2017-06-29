import styled from "styled-components/native";
import colors from "../../config/colors";

export default styled.View`
  border-bottom-color: ${colors.halfWhite};
  border-bottom-width: 0.5px;
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
`;
