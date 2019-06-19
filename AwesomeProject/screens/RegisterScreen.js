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
import { ScrollView } from "react-native-gesture-handler";
class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      RepeatPassword: ""
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
      <View style={{width:'70%'}}>
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
                <Text style={{ color: "#FFF" }}>Sign Up</Text>
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
        <ScrollView
          style={{
            backgroundColor: "#1C2632",
            flex: 1,
            padding: 30,
            paddingTop: 100
          }}
        >
          <FloatingLabelInput
            style={styles.text}
            label="Email"
            onChangeText={text => this.setState({ email: text })}
            keyboardType="email-address"
            value={this.state.email}
          />

          <FloatingLabelInput
            style={styles.text}
            label={"Password"}
            onChangeText={text => this.setState({ password: text })}
            textContentType="password"
            value={this.state.password}
          />
          <FloatingLabelInput
            style={styles.text}
            label={"Repeat password"}
            onChangeText={text => this.setState({ RepeatPassword: text })}
            textContentType="password"
            value={this.state.RepeatPassword}
          />
        </ScrollView>
        <KeyboardAvoidingView
          style={{
            backgroundColor: "#1C2632",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "stretch",
            padding: 30,
            paddingTop: 0
          }}
          behavior="padding"
          enabled
        >
          <StatusBar barStyle={"light-content"} />

          <View style={{flexDirection:'column',alignItems:"center"}}>
            {this.handleLoading()}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Text style={{ color: "#74808E" }}>Already Have an account?</Text>
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
)(RegisterScreen);
