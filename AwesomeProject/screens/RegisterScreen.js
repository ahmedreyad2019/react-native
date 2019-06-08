import React from "react";
import {
  TextInput,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  Picker,
  Modal,
  TouchableHighlight,
  Alert
} from "react-native";

import {styles} from "../styles";

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      c: true,
      loggedin: false,
      token: "",
      error: false,
      name: "",
      modalVisible: false
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    const { navigation } = this.props;
    const itemId = navigation.getParam("token", "NO-ID");
  }
  handleInputChange = event => {
    return text => {
      this.setState({
        [event]: text.nativeEvent.text
      });
    };
  };
  handleEmail = event => {
    this.setState({ email: event });
  };
  handlePassword = event => {
    this.setState({ password: event });
  };
  handleSubmit = () => {
    console.log(this.state);
  };

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          style={{ backgroundColor: "red" }}
          presentationStyle={"pageSheet"}
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
export default RegisterScreen;
