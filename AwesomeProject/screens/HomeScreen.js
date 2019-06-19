import React from "react";
import {
  TextInput,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ActivityIndicator,
  Animated,
  Easing
} from "react-native";
import { LinearGradient } from "expo";
import { connect } from "react-redux";
import { styles } from "../styles";
import * as actions from "../actions/index";
import FloatingLabelInput from "../components/FloatingLabelInput";
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  componentDidMount = () => {};
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
            colors={["transparent", "rgba(0,0,0,0.3)"]}
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
  componentWillUpdate = () => {
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
          justifyContent: "space-evenly",
          alignItems: "stretch",
          padding: 30
        }}
        behavior="padding"
        enabled
      >
        <StatusBar barStyle={"light-content"} />

        <View style={{top:0}}>
          <FloatingLabelInput
            style={styles.text}
            label="Email"
            onChangeText={text => this.setState({ email: text })}
            keyboardType="email-address"
            value={this.state.email}
          />

          <FloatingLabelInput
            style={styles.text}
            label={"password"}
            onChangeText={text => this.setState({ password: text })}
            textContentType="password"
            value={this.state.password}
          />
        </View>
        <View>
          {this.handleLoading()}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style={{ color: "#74808E" }}>
              if you do not have an account, register here
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state =>
  ({ token, loggedIn, loading } = state.loginReducer);
const mapDispatchToProps = dispatch => ({
  doLogin: (email, password) => {
    dispatch(actions.login(email, password));
  },
  doClear: () => {
    dispatch(actions.clear());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
