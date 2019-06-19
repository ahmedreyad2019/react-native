import React from "react";
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  Vibration,
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
    this.RotateValueHolder = new Animated.Value(0);
  }

  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);

    Animated.timing(this.RotateValueHolder, {
      toValue: 2,
      duration: 500,
      easing: Easing.quad
    }).start();
  }

  componentDidUpdate = () => {
    if (this.props.error) {
      Vibration.vibrate([100]);
      this.StartImageRotateFunction();
      this.props.doError(false);
    }
  };
  handleLoading = () => {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2],
      outputRange: [0, -20, 0, 20, 0, -15, 0, 10, 0, -15, 0]
    });
    const labelStyle = {
      transform: [{ translateX: RotateData }]
    };
    return (
      <View style={{ width: "70%" }}>
        <Animated.View style={labelStyle}>
          <TouchableOpacity
            onPress={() =>
              this.props.doLogin(this.state.email, this.state.password)
            }
          >
            <LinearGradient
              style={styles.button}
              colors={["transparent", "rgba(0,0,0,0.3)"]}
            >
              {!this.props.loading ? (
                <Text style={{ color: "#FFF" }}>Sign in</Text>
              ) : (
                <ActivityIndicator
                  animating={this.props.loading}
                  size="small"
                  color={"#FFF"}
                />
              )}
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
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
      <>
        <View
          style={{
            backgroundColor: "#1C2632",
            flex: 1,
            padding: 30,
            paddingTop: 100
          }}
        >
          <FloatingLabelInput
            autoCapitalize={"none"}
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
        <KeyboardAvoidingView
          style={{
            backgroundColor: "#1C2632",
            flex: 0.8,

            padding: 30
          }}
          behavior="padding"
          enabled
        >
          <StatusBar barStyle={"light-content"} />

          <View style={{ flexDirection: "column", alignItems: "center" }}>
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
      </>
    );
  }
}
const mapStateToProps = state =>
  ({ token, loggedIn, loading } = state.loginReducer);
const mapDispatchToProps = dispatch => ({
  doLogin: (email, password) => {
    dispatch(actions.login(email, password));
  },
  doError: error => {
    dispatch(actions.setError(error));
  },
  doClear: () => {
    dispatch(actions.clear());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
