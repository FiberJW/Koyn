// @flow
import { Dimensions } from "react-native";

export default (color: string) => ({
  width: Dimensions.get("window").width * 0.6,
  height: 48,
  showAreas: false,
  strokeWidth: 4,
  color,
  margin: {
    top: 8,
    left: 8,
    bottom: 8,
    right: 8
  },
  axisX: {
    showAxis: false,
    showLines: false,
    showLabels: false,
    showTicks: false,
    zeroAxis: false,
    orient: "bottom",
    label: {
      fontFamily: "Arial",
      fontSize: 14,
      fontWeight: true,
      fill: "#34495E"
    }
  },
  axisY: {
    showAxis: false,
    showLines: false,
    showLabels: false,
    showTicks: false,
    zeroAxis: false,
    orient: "left",
    label: {
      fontFamily: "Arial",
      fontSize: 14,
      fontWeight: true,
      fill: "#34495E"
    }
  }
});
