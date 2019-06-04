import React from "react";
import {
  SegmentedControlIOS,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from "react-native";
import { Header } from "react-native-elements";
const styles = {
  profile: {
    padding: 20,
    backgroundColor: "#303655",
    borderColor: "#DBA73F",
    borderRadius: "33px",
    borderWidth: "3",
    shadowColor: "#000",
    width: 240,
    height: 267,
    shadowOpacity: 0.4,
    shadowRadius: 3,
    shadoOffset: {
      height: 3
    },
    marginHorizontal: 20,
    marginVertical: 20,
    flex: 1
  }
};
class CompaniesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0, data: [], data2: [], loading: false };
  }
  componentDidMount = () => {
    this.fetchRequests();
    this.fetchRequests2();
  };
  fetchRequests = () => {
    const { navigation } = this.props;
    const itemId = navigation.getParam("id", "NO-ID");
    const otherParam = navigation.getParam("token", "some default value");
    this.setState({ loading: true });

    console.log(otherParam + " HO");
    fetch(
      `http://serverbrogrammers.herokuapp.com/api/investors/MyRequests/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": otherParam
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        this.setState({
          data2: response.data,
          loading: false,
          refresh: false
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {});
  };
  fetchRequests2 = () => {
    const { navigation } = this.props;
    const itemId = navigation.getParam("id", "NO-ID");
    const otherParam = navigation.getParam("token", "some default value");
    console.log(otherParam + " HO");
    fetch(
      `http://serverbrogrammers.herokuapp.com/api/investors/View/ViewCompanies`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": otherParam
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: response.data,
          loading: false,
          refresh: false
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {});
  };
  renderView = () => {
    return (
      <View>
        <ActivityIndicator
          animating={this.state.loading}
          size="small"
          color={"#303655"}
        />
        <FlatList
          horizontal
          data={
            this.state.selectedIndex === 0 ? this.state.data : this.state.data2
          }
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
    );
  };
  render() {
    return (
      <>
        <Header
          backgroundColor={"#fff"}
          centerComponent={{
            text: "Companies",
            style: { color: "black", fontWeight: "bold", fontSize: 20 }
          }}
        />
        <SegmentedControlIOS
          values={["Approved", "Requested"]}
          selectedIndex={this.state.selectedIndex}
          onChange={event => {
            this.setState({
              selectedIndex: event.nativeEvent.selectedSegmentIndex
            });
          }}
          tintColor={"#303655"}
        />
        {this.renderView()}
      </>
    );
  }
}

export default CompaniesScreen;
