import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";

import { Easing, Animated } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import React from "react";
import ProfileScreen from "../screens/ProfileScreen";
import FeedScreen from "../screens/FeedScreen";
import CompaniesScreen from "../screens/CompaniesScreen";
import FilterScreen from "../screens/FilterScreen";

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === "Feed") {
    iconName = `home`;
  } else if (routeName === "Profile") {
    iconName = `person`;
  } else if (routeName === "Companies") {
    iconName = `paper`;
  }

  return <IconComponent name={`ios-` + iconName} size={25} color={tintColor} />;
};

const filterNav = createStackNavigator(
  {
    content: { screen: CompaniesScreen },
    modal: { screen: FilterScreen }
  },
  {
    headerMode: "none",
    mode: "modal",
    initialRouteName: "content",
    transparentCard: true,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 550,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const thisSceneIndex = scene.index;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [height, 0, 0]
        });

        const opacity = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [1, 1, 0.5]
        });

        return { opacity, transform: [{ translateY }] };
      }
    })
  }
);
const tabNav = createAppContainer(
  createBottomTabNavigator(
    {
      Feed: { screen: FeedScreen },
      Companies: { screen: filterNav },
      Profile: { screen: ProfileScreen }
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor)
      }),
      tabBarOptions: {

        activeTintColor: "#90F6DE",
        inactiveTintColor: "#bbbbbb",
        style: {
          backgroundColor: "#263241"
        }
      }
    }
  )
);

const MainNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Home: { screen: HomeScreen },
      Register: { screen: RegisterScreen },
      Dashboard: { screen: tabNav }
    },
    {
      mode: "card",
      headerMode: "none",

      navigationOptions: {
        headerVisible: true
      },

      transitionConfig: () => ({
        transitionSpec: {
          duration: 300,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing
        }
      })
    }
  )
);

const App = createAppContainer(MainNavigator);

export default App;
