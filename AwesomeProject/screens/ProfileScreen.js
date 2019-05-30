import React from "react";
import {
  ScrollView,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Text,
  View
} from "react-native";
const styles = {
  profile: {
    padding: 20,
    backgroundColor: "white",
    borderColor: "white",
    borderRadius: "10px",
    borderWidth: "1",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  container: {
    padding: 20,
    backgroundColor: "#333D51",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  }
};
class LinksScreen extends React.Component {
  _onPressButton() {
    Alert.alert(" fucking");
  }

  _onLongPressButton() {
    Alert.alert("You long-pressed the button!");
  }
  componentDidMount() {
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
          refreshing: false
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {});
  }

  constructor(props) {
    super(props);
    this.state = { investor: null, loading: true, pressing: false };
  }
  _onRefresh = () => {
    this.componentDidMount;
  };
  render() {
    if (this.state.investor != null) {
    }
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <ActivityIndicator size="small" animating={this.state.loading} />
        {this.state.investor != null ? (
          <>
         <View style={{flexDirection: "row",
         justifyContent: "center",
         alignItems: "stretch"}}>
            <View
              style={{
                borderColor: "#E91A58",
                borderRadius: "20px",
                borderWidth: "1",
                width: 80,
                height: 80,
                backgroundColor: "#E91A58",
                padding: 5,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 30 }}>
                {" "}
                {this.state.investor.name.split(" ")[0].substring(0, 1) +
                  this.state.investor.name
                    .split(" ")
                    [this.state.investor.name.split(" ").length - 1].substring(
                      0,
                      1
                    )}
              </Text>
            </View>
            </View>
            <Text> {this.state.investor.name}</Text>
            <Text> {this.state.investor.mail}</Text>
            <Text> {this.state.investor.dob}</Text>
            <Text> {this.state.investor.idNumber}</Text>
            <Text> {this.state.investor.idType}</Text>
            <Text> {this.state.investor.address}</Text>
            <Text> {this.state.investor.fax}</Text>
    </>   
        ) : (
          console.log("hi")
        )}
      </ScrollView>
    );
  }
}

export default LinksScreen;
