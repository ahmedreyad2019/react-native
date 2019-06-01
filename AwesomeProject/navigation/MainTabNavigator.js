import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Register: { screen: RegisterScreen },
    Profile: { screen: ProfileScreen }
  },
  {
    mode: "card",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  },
 
);

const App = createAppContainer(MainNavigator);

export default App;
