import React from "react";
import {
  TextInput,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  AsyncStorage
} from "react-native";

import { connect } from "react-redux";
import { styles } from "../styles";
import * as actions from "../actions/index";
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleLoading = () => {
    return (
      <View style={{ paddingHorizontal: 60 }}>
        <TouchableOpacity
          style={!this.props.error ? styles.button : styles.buttonError}
          onPress={() =>
            this.props.doLogin(this.state.email, this.state.password)
          }
        >
          {!this.props.loading ? (
            <Text
              style={
                !this.props.error ? { color: "#DBA73F" } : { color: "#FF0000" }
              }
            >
              Sign in
            </Text>
          ) : (
            <ActivityIndicator
              animating={this.props.loading}
              size="small"
              color={"#DBA73F"}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };
  componentDidUpdate=()=>{
    if (this.props.loggedIn) {this.props.navigation.navigate("Profile")};

  }
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
            onChangeText={text => this.setState({ email: text })}
            keyboardType="email-address"
            value={this.state.email}
          />

          <TextInput
            style={styles.text}
            placeholder="Password"
            onChangeText={text => this.setState({ password: text })}
            textContentType="password"
            secureTextEntry={true}
            value={this.state.password}
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
const mapStateToProps = state =>
  ({ token, loggedIn, loading } = state.loginReducer);
const mapDispatchToProps = dispatch => ({
  doLogin: (email, password) => {
    dispatch(actions.login(email, password));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
