import React from "react";
import {
 Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VibrationIOS,
  Alert
} from "react-native";

export default class SettingsScreen extends React.Component {
  
  hi=()=>{
    this.props.navigation.navigate("/LinksScreen")
  }
  static navigationOptions = {
    title: "app.json"
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>hi there</Text>
        <Button
  onPress={Alert.alert(
    'update',
    '',
    [
      {
        text: 'cancel',
        onPress: () =>console.log(),
        style: 'cancel',
      },
      {
        text: 'bye',
        onPress: () => VibrationIOS.vibrate(),
        style: 'cancel',
      },
     
    ],
  )}
  title="Don't press"
  color="#c30803"
  accessibilityLabel="Learn more about this purple button"
/>
        <Button
  onPress={this.hi}
  title="press"
  color="#c30803"
  accessibilityLabel="Learn more about this purple button"
/>
      </View>
    );
  }
}
