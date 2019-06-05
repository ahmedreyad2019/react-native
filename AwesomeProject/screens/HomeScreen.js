import React from "react";
import {
  TextInput,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import robot from "../assets/images/robot-dev.png";
import { Icon } from "react-native-elements";
const robots = robot;
const styles = {
  text: {
    height: 47,
    backgroundColor: "#FFFEF7",
    borderStyle: "solid",
    borderColor: "#4A427B",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 30,
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
  buttonError: {
    alignItems: "center",
    height: 52,
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "#FF0000",
    borderWidth: "1",
    padding: 15,
    fontSize: 15,
    marginBottom: 10,
    marginHorizzontal: 40,
    color: "#DBA73F"
  }
};

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      c: true,
      loggedin: false,
      token: "",
      error: false,
      loading: false
    };
  }
  handleEmail = event => {
    this.setState({ email: event });
  };
  handlePassword = event => {
    this.setState({ password: event });
  };
  handleRegister = () => {
    const { navigate } = this.props.navigation;
    navigate("Register", { token: "l" });
    console.log("aaaaa");
  };
  handleSubmit = () => {
    const { navigate } = this.props.navigation;
    this.setState({ loading: true });
    fetch("https://serverbrogrammers.herokuapp.com/api/investors/login", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        if (data.auth) {
          this.setState({
            loggedin: true,
            token: data.token,
            error: false,
            loading: false
          });
          console.log("success");
          navigate("Profile", { token: data.token, id: data.id });
        } else {
          this.setState({
            error: true,
            loading: false
          });
        }
      });
    });
  };
  handleLoading = () => {
    if (!this.state.loading)
      return (
        <View style={{ paddingHorizontal: 60 }}>
          <TouchableOpacity
            style={!this.state.error ? styles.button : styles.buttonError}
            onPress={this.handleSubmit}
          >
            <Text
              style={
                !this.state.error ? { color: "#DBA73F" } : { color: "#FF0000" }
              }
            >
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      );
    else
      return (
        <ActivityIndicator
          animating={this.state.loading}
          size="small"
          color={"#303655"}
        />
      );
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={{
          backgroundColor: "#FFFFFF",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          padding: 30
        }}
        behavior="padding"
        enabled
      >
        <View>
          
            <TextInput
              style={styles.text}
              placeholder="Email"
              onChangeText={text => this.handleEmail(text)}
              keyboardType="email-address"
            />
         
          <TextInput
            style={styles.text}
            placeholder="Password"
            onChangeText={text => this.handlePassword(text)}
            textContentType="password"
            secureTextEntry={true}
            onChange={this.handlePassword}
          />
        </View>
        {this.handleLoading()}
        <TouchableOpacity onPress={this.handleRegister}>
          <Text style={{ color: "#DBA73F" }}>
            if you do not have an account, register here
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
