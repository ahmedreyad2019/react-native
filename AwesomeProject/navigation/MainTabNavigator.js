
import { createStackNavigator,createAppContainer} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
},{mode:'card'});

const App = createAppContainer(MainNavigator);

export default App;