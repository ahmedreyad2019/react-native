import React from "react";
import {
  TextInput,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const styles = {
  text: {
    height: 60,
    backgroundColor: "#F4F3EA",
    borderStyle: "solid",
    borderColor: "#CBD0D8",
    borderWidth: "2",
    borderRadius: "5px",
    padding: 15,
    marginBottom: 30,
    fontSize: 20,
    color:'#333D51'
  },
  button: {
    alignItems: "center",
    height: 50,
    backgroundColor: "#D3AC2b",
    borderStyle: "solid",
    borderColor: "#D3AC2b",
    borderWidth: "1",
    borderRadius: "10px",
    padding: 15,
    marginBottom: 30
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
      token: ""
    };
  }
  handleEmail = event => {
    this.setState({ email: event });
  };
  handlePassword = event => {
    this.setState({ password: event });
  };
  handleSubmit = () => {
    const { navigate } = this.props.navigation;

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
            token: data.token
          });
          console.log("success");
          navigate("Profile",{token:data.token,id:data.id});
        }
      });
    });
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: "#333D51",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          padding: 30
        }}
      >
        <KeyboardAvoidingView behavior="padding" enabled>
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
              secureTextEntry="true"
              onChange={this.handlePassword}
            />
          </View>
          <View style={{ paddingHorizontal: 60 }}>
            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
              <Text style={{ color: "#333D51" }}> Sign in </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
