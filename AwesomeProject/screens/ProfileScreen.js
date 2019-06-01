import React from "react";
import {
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Text,
  StatusBar,
  View
} from "react-native";

const styles = {
  profile: {
    padding: 20,
    backgroundColor: "white",
    borderColor: "#EBB62B",
    borderRadius: "10px",
    borderWidth: "1",
    shadowColor: "#000",

    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginHorizontal: 20,
    marginVertical: 20
  },
  avatar: {
    borderColor: "#E91A58",
    borderRadius: "20px",
    borderWidth: "1",
    width: 80,
    height: 80,
    backgroundColor: "#E91A58",
    padding: 5,
    justifyContent: "center",
    alignItems: "center"
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
  componentDidMount() {
    this.makeRemoteRequest();
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
  makeRemoteRequest = () => {
    this.setState({ refresh: true });
    fetch("http://serverbrogrammers.herokuapp.com/api/company", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ data: response.data, refresh: false });
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => {
        console.log(this.state.data[0]._id);
      });
  };
  constructor(props) {
    super(props);
    this.state = { investor: null, loading: true, refresh: false, data: [] };
  }
  _onRefresh = () => {
    this.makeRemoteRequest();
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "#333D51",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          padding: 30
        }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        {this.state.investor != null ? (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "stretch",
                marginTop: 20
              }}
            >
              <View style={styles.avatar}>
                <Text style={{ fontSize: 30 }}>
                  {this.state.investor.name.split(" ")[0].substring(0, 1) +
                    this.state.investor.name
                      .split(" ")
                      [
                        this.state.investor.name.split(" ").length - 1
                      ].substring(0, 1)}
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
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1
          }}
        />
        <View>
          <FlatList
            horizontal
            data={this.state.data}
            renderItem={({ item }) => (
              <View style={styles.profile}>
                <Text>{item.nameInArabic}</Text>
                <Text>{item.nameInEnglish}</Text>
                <Text>{item.investorEmail}</Text>
              </View>
            )}
            keyExtractor={item => {
              return item._id;
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

export default LinksScreen;
