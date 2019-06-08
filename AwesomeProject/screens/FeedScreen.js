import React from "react";
import {
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Text,
  StatusBar,
  View
} from "react-native";
import { Header } from "react-native-elements";
import {styles} from "../styles";
class FeedScreen extends React.Component {
  componentDidMount() {
    this.makeRemoteRequest();
  }
  makeRemoteRequest = () => {
    fetch("http://serverbrogrammers.herokuapp.com/api/company", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ data: response.data, loading: false, refresh: false });
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
      <>
        <Header
          backgroundColor={"#fff"}
          centerComponent={{
            text: "Home",
            style: { color: "black", fontWeight: "bold", fontSize: 20 }
          }}
        />
        <ActivityIndicator
          animating={this.state.loading}
          size="small"
          color={"#303655"}
        />
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center"
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this._onRefresh}
            />
          }
        >
          <View>
            <Text
              style={{ fontSize: 29, fontWeight: "bold", color: "#303655" }}
            >
              Electronic Journal
            </Text>
          </View>

          <View>
            <FlatList
              horizontal
              data={this.state.data}
              renderItem={({ item }) => (
                <View style={styles.profile}>
                  <Text
                    style={{
                      color: "#DBA73F",
                      fontWeight: "bold",
                      fontSize: 23
                    }}
                  >
                    {item.nameInEnglish}
                  </Text>
                  <Text
                    style={{
                      color: "#8F856B",
                      fontWeight: "bold",
                      fontSize: 16
                    }}
                  >
                    {item.nameInArabic}
                  </Text>
                  <Text
                    style={{
                      color: "#CCCCCC",
                      fontWeight: "bold",
                      fontSize: 67
                    }}
                  >
                    {item.legalCompanyForm}
                  </Text>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      marginBottom: 36
                    }}
                  >
                    <Text style={{ color: "#CCCCCC" }}>View details</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => {
                return item._id;
              }}
            />
          </View>
        </ScrollView>
      </>
    );
  }
}

export default FeedScreen;
