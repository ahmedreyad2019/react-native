import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import FeedScreen from "../screens/FeedScreen";
import CompaniesScreen from "../screens/CompaniesScreen";
const DashboardTabNavigator = createBottomTabNavigator(
  {
    FeedScreen,
    RegisterScreen,
    CompaniesScreen,
    ProfileScreen
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerVisible: true
      };
    },
    animationEnabled: true
  }
);
const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Register: { screen: RegisterScreen },
    Profile: { screen: DashboardTabNavigator }
  },
  {
    mode: "card",
    headerMode: "none",
    navigationOptions: {
      headerVisible: true
    }
  }
);

const App = createAppContainer(MainNavigator);

export default App;
