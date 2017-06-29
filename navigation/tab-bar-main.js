// @flow
import React, { Component } from "react";
import { StatusBar, ScrollView } from "react-native";
import colors from "../config/colors";
import Container from "../components/styled/container-tab-bar-main";
import TabLabel from "../components/tab-label";
import TabIcon from "../components/tab-icon";

export default class MainTabBar extends Component {
  render() {
    const { routes, index } = this.props.navigation.state;

    return (
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.muddledWine}
        />
        <ScrollView horizontal>
          {routes.map((route, i) => {
            const focused = index === i;

            return route.key !== "Settings"
              ? <TabLabel
                  key={i}
                  focused={focused}
                  text={this.props.getLabel({
                    route,
                    tintColor: "white",
                    focused
                  })}
                  onPress={() => this.props.jumpToIndex(i)}
                />
              : null;
          })}
        </ScrollView>
        {routes.map((route, i) => {
          const focused = index === i;
          if (route.key === "Settings") {
            const Icon = this.props.renderIcon({
              route,
              tintColor: "white",
              focused
            });

            return (
              <TabIcon
                key={i}
                focused={focused}
                icon={React.cloneElement(Icon)}
                onPress={() => this.props.jumpToIndex(i)}
              />
            );
          }
          return null;
        })}
      </Container>
    );
  }
}
