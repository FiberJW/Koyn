import React from "react";
import { TouchableOpacity } from "react-native";
import Container from "./styled/container-tab-label";
import Text from "./styled/text-tab-label";

export default ({ focused, text, onPress }) =>
  <TouchableOpacity onPress={onPress}>
    <Container focused={focused}>
      <Text focused={focused}>
        {text}
      </Text>
    </Container>
  </TouchableOpacity>;
