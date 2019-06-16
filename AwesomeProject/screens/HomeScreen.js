import React from "react";
import {
  TextInput,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Animated,
  Easing
} from "react-native";
import { LinearGradient } from "expo";
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
          onPress={() =>
            this.props.doLogin(this.state.email, this.state.password)
          }
        >
          <LinearGradient
            style={!this.props.error ? styles.button : styles.buttonError}
            colors={["transparent", "rgba(0,0,0,0.2)"]}
          >
            {!this.props.loading ? (
              <Text
                style={
                  !this.props.error ? { color: "#FFF" } : { color: "#FF0000" }
                }
              >
                Sign in
              </Text>
            ) : (
              <ActivityIndicator
                animating={this.props.loading}
                size="small"
                color={"#FFF"}
              />
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };
  componentDidUpdate = () => {
    if (this.props.loggedIn) {
      this.props.navigation.navigate("Dashboard");
    }
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={{
          backgroundColor: "#1C2632",
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
            placeholderTextColor="#8ac"
          />

          <TextInput
            style={styles.text}
            placeholder="Password"
            onChangeText={text => this.setState({ password: text })}
            textContentType="password"
            secureTextEntry={true}
            value={this.state.password}
            placeholderTextColor="#8ac"
          />
        </View>
        {this.handleLoading()}
        <TouchableOpacity onPress={this.handleRegister}>
          <Text style={{ color: "#74808E" }}>
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
