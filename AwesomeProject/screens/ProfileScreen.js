import React from "react";
import {
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  RefreshControl,
  Text,
  StatusBar,
  View,
  TouchableOpacity
} from "react-native";
import { Header } from "react-native-elements";
/*
-sign in
--sign up
--dashboard
---home-->electronic journal
---profile-->view profile,edit profile,sign out
---companies-->view requests,view companies,create
---settings




*/
const styles = {
  avatar: {
    borderColor: "#E4C914",
    borderRadius: "14px",
    borderWidth: "1",
    width: 85,
    height: 85,
    backgroundColor: "#303655",
    padding: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  container2: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20
  },
  button: {
    alignItems: "center",
    height: 52,
    backgroundColor: "#FFFFFF",
    borderStyle: "solid",
    borderColor: "#FF2525",
    borderWidth: "1",
    padding: 15,
    fontSize: 15,
    marginBottom: 10,
    marginHorizzontal: 40,
    color: "#DBA73F"
  }
};
class LinksScreen extends React.Component {
  componentDidMount() {
    this.makeRemoteRequest();
  }
  makeRemoteRequest = () => {
    const { navigation } = this.props;
    const itemId = navigation.getParam("id", "NO-ID");
    const otherParam = navigation.getParam("token", "some default value");
    fetch(`http://serverbrogrammers.herokuapp.com/api/investors/${itemId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": otherParam
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          investor: response.data,
          loading: false,
          refresh: false,
          date: new Date(response.data.dob).toLocaleDateString("en-US")
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {});
  };
  handleSignOut = () => {
    this.props.navigation.navigate("Home",{'token':null});
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
          animating={this.state.loading}
          size="small"
          color={"#303655"}
        />
        <View style={styles.container}>
          <View style={styles.avatar}>
            <Text
              style={{ fontSize: 31, fontWeight: "bold", color: "#DBA73F" }}
            >
              {this.state.investor
                ? this.state.investor.name.split(" ")[0].substring(0, 1) +
                  this.state.investor.name
                    .split(" ")
                    [this.state.investor.name.split(" ").length - 1].substring(
                      0,
                      1
                    )
                : console.log()}
            </Text>
          </View>
        </View>
        {this.state.investor ? (
          <View style={styles.container2}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold"
              }}
            >
              {this.state.investor.name}
            </Text>
            <View>
              <Text style={{ fontSize: 20 }}>
                Email:{this.state.investor.mail}
              </Text>
              <Text style={{ fontSize: 20 }}>Birthdate: {this.state.date}</Text>
              <Text style={{ fontSize: 20 }}>
                ID: {this.state.investor.idNumber}
              </Text>
              <Text style={{ fontSize: 20 }}>
                Address: {this.state.investor.address}
              </Text>
              <Text style={{ fontSize: 20 }}>
                Fax: {this.state.investor.fax}
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

export default LinksScreen;
