import styled from "styled-components/native";

export default styled.View`
  background-color: ${({ color }) => color};
  height: 16px;
  width: 16px;
  border-radius: 8px;
  margin-vertical: 4px;
  margin-right: 4px;
  margin-left: 8px;
`;
