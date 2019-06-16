import React from "react";
import {
  SegmentedControlIOS,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Button
} from "react-native";

const styles = {
  profile: {
    padding: 20,
    backgroundColor: "#303655",
    borderColor: "#DBA73F",
    borderRadius: "33px",
    borderWidth: "3",
    shadowColor: "#000",
    width: 245,
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
class FilterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      data: [],
      data2: [],
      results: [],
      results2: [],
      loading: false,
      order: "asc",
      selectedKey: "nameInEnglish",
      search: ""
    };
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
          results2: response.data,
          loading: false,
          refresh: false
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {});
  };
  updateSearch = text => {
    const { data, data2, selectedIndex } = this.state;
    var companies = selectedIndex === 0 ? data : data2;
    companies = companies
      .filter(function(company) {
        return company.nameInEnglish.toLowerCase().includes(text.toLowerCase());
      })
      .map(function(country) {
        return country;
      });
    if (selectedIndex === 0)
      this.setState({ results: companies, search: text });
    else if (selectedIndex === 1)
      this.setState({ results2: companies, search: text });
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
          results: response.data,
          loading: false,
          refresh: false
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {});
  };

  handleSort = () => {
    this.setState(prevState => {
      if (this.state.selectedIndex === 0)
        return {
          results: prevState.results.sort(
            this.compare(this.state.selectedKey, this.state.order)
          ),
          order: prevState.order === "asc" ? "desc" : "asc"
        };
      else if (this.state.selectedIndex === 1)
        return {
          results2: prevState.results2.sort(
            this.compare(this.state.selectedKey, this.state.order)
          ),
          order: prevState.order === "asc" ? "desc" : "asc"
        };
    });
  };
  compare = (key, order = "asc") => {
    return function(item1, item2) {
      if (!item1.hasOwnProperty(key) || !item2.hasOwnProperty(key)) {
        return 0;
      }
      let att1 =
        typeof item1[key] === "string" ? item1[key].toUpperCase() : item1[key];
      let att2 =
        typeof item2[key] === "string" ? item2[key].toUpperCase() : item2[key];
      let comp = 0;
      if (att1 > att2) comp = 1;
      else if (att2 > att1) comp = -1;
      return order == "desc" ? comp * -1 : comp;
    };
  };
  render() {
    return (
      <View style={{ flex: 1 ,flexDirection: 'column', justifyContent: 'flex-end'}}>
          <View style={{ height: "50%" ,width: '100%', backgroundColor:"#fff", justifyContent:"center"}}>
            <Text>Testing a modal with transparent background</Text>
          </View>
      </View>
    );
  }
}

export default FilterScreen;
