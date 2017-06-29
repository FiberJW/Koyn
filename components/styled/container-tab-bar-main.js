import styled from "styled-components/native";
import { Platform, StatusBar } from "react-native";
import colors from "../../config/colors";

const isIOS = Platform.OS === "ios";
const iOSPaddingTop = 20;
const headerHeight = 56;

export default styled.View`
  padding-top: ${isIOS ? `${iOSPaddingTop}px` : `${StatusBar.currentHeight}px`};
  padding-horizontal: 8px;
  background-color: ${colors.comet};
  min-height: ${isIOS
    ? `${headerHeight + iOSPaddingTop}px`
    : `${headerHeight + StatusBar.currentHeight}px`};
  border-bottom-color: ${colors.halfWhite};
  border-bottom-width: 0.5px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
