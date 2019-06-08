import React from "react";
import { ActivityIndicator, Text, View, TouchableOpacity } from "react-native";
import { Header } from "react-native-elements";
import { connect } from "react-redux";
import { styles } from "../styles";
import * as actions from "../actions/index";

class LinksScreen extends React.Component {
  componentDidMount() {
    this.makeRemoteRequest();
  }
  makeRemoteRequest = () => {
    const {userId,token}=this.props
   this.props.doFetch(userId,token)
  };
  handleSignOut = () => {
    this.props.navigation.navigate("Home");
  };
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      investor: null,
      loading: true,
      refresh: false,
      data: []
    };
  }
  _onRefresh = () => {
    this.makeRemoteRequest();
  };

  render() {
    const {user}=this.props
    return (
      <>
        <Header
          backgroundColor={"#fff"}
          centerComponent={{
            text: "Profile",
            style: { color: "black", fontWeight: "bold", fontSize: 20 }
          }}
        />
        <ActivityIndicator
          animating={this.props.loading}
          size="small"
          color={"#303655"}
        />
        <View style={styles.container}>
          <View style={styles.avatar}>
            <Text
              style={{ fontSize: 31, fontWeight: "bold", color: "#DBA73F" }}
            >
              {user
                ? user.name.split(" ")[0].substring(0, 1) +
                  user.name
                    .split(" ")
                    [user.name.split(" ").length - 1].substring(
                      0,
                      1
                    )
                : console.log()}
            </Text>
          </View>
        </View>
        {user ? (
          <View style={styles.container2}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold"
              }}
            >
              {user.name}
            </Text>
            <View>
              <Text style={{ fontSize: 20 }}>
                Email:{user.mail}
              </Text>
              <Text style={{ fontSize: 20 }}>Birthdate: {new Date(user.dob).toLocaleDateString("en-US")}</Text>
              <Text style={{ fontSize: 20 }}>
                ID: {user.idNumber}
              </Text>
              <Text style={{ fontSize: 20 }}>
                Address: {user.address}
              </Text>
              <Text style={{ fontSize: 20 }}>
                Fax: {user.fax}
              </Text>
            </View>
          </View>
        ) : (
          console.log()
        )}
        <View style={{ paddingHorizontal: 60 }}>
          <TouchableOpacity style={styles.button} onPress={this.handleSignOut}>
            <Text style={{ color: "#FF2525" }}> Sign Out </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
const mapStateToProps = state =>
  ({ loading, token, userId } = state.loginReducer);
const mapDispatchToProps = dispatch => ({
  doFetch: (userId, token) => {
    dispatch(actions.fetchProfile(userId, token));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinksScreen);
