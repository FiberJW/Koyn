import React from "react";
import { TouchableOpacity } from "react-native";
import Container from "./styled/container-tab-icon";

export default ({ focused, icon, onPress }) =>
  <TouchableOpacity onPress={onPress}>
    <Container focused={focused}>
      {icon}
    </Container>
  </TouchableOpacity>;
