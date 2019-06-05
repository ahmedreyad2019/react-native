import React from "react";
import {
  TextInput,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  Picker,
  
} from "react-native";

const styles = {
  text: {
    height: 47,
    backgroundColor: "#FFFEF7",
    borderStyle: "solid",
    borderColor: "#4A427B",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 20,
    color: "#333D51"
  },
  button: {
    alignItems: "center",
    height: 52,
    backgroundColor: "#303655",
    borderStyle: "solid",
    borderColor: "#DBA73F",
    borderWidth: "1",
    padding: 15,
    fontSize: 15,
    marginBottom: 10,
    marginHorizzontal: 40,
    color: "#DBA73F"
  },
};

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
      name: ""
    };
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
      <KeyboardAvoidingView
        style={{
          backgroundColor: "white",
          flex: 1,
          justifyContent: "space-between",
          padding: 30
        }}
        behavior="padding"
        enabled
      >
        <TextInput
          name={"name"}
          style={styles.text}
          placeholder="Name"
          onChange={this.handleInputChange("name")}
          keyboardType="default"
        />
        <TextInput
          name={"email"}
          style={styles.text}
          placeholder="Email"
          onChange={this.handleInputChange("email")}
          keyboardType="email-address"
        />
        <View style ={{ flexDirection: "row", alignItems: "center" }}>
         
          <View style={{ flex: 0.7 }}>
            <TextInput
              style={styles.text}
              placeholder="mobile number"
              onChange={this.handleInputChange("mobile")}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <TextInput
          style={styles.text}
          placeholder="Password"
          onChange={this.handleInputChange("password")}
          textContentType="password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.text}
          placeholder="Repeat password"
          onChange={this.handleInputChange("password2")}
          textContentType="password"
          secureTextEntry={true}
        />

        <View style={{ paddingHorizontal: 60 }}>
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={{ color: "#DBA73F" }}> Sign up </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
export default RegisterScreen;
