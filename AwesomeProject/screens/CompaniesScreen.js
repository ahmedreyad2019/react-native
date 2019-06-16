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
  KeyboardAvoidingView,
  Button,
  Modal,
  Keyboard,
  StatusBar
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "../styles";
import { Header, SearchBar, ButtonGroup } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import CompanyDetials from "../components/CompanyDetails";
import { LinearGradient } from "expo";
class CompaniesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,

      results: [],
      results2: [],
      loading: false,
      order: "asc",
      selectedKey: "nameInEnglish",
      search: "",
      hi: false,
      companyDetailsVisible: false
    };
  }
  componentDidMount = () => {
    this.props.doFetchReq(this.props.token);
    this.props.doFetchComp(this.props.token);
  };
  setModalVisible(visible) {
    this.setState({ hi: visible });
  }
  updateSearch = text => {
    const { selectedIndex } = this.state;
    const { approved, requested } = this.props.companies;
    var companies = approved.concat(requested);
    companies = companies
      .filter(function(company) {
        return (
          company.nameInEnglish.toLowerCase().includes(text.toLowerCase()) ||
          company.nameInArabic.toLowerCase().includes(text.toLowerCase()) ||
          company.investorName.toLowerCase().includes(text.toLowerCase())
        );
      })
      .map(function(country) {
        return country;
      });
    if (selectedIndex === 0)
      this.setState({ results: companies, search: text });
    else if (selectedIndex === 1)
      this.setState({ results2: companies, search: text });
  };

  renderView = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "#1C2632" }}>
        <ButtonGroup
          selectedButtonStyle={{ backgroundColor: "#90F6DE" }}
          selectedTextStyle={{ color: "#1C2632" }}
          containerStyle={{ backgroundColor: "#1C2632" }}
          buttons={["Approved", "Requested", "Create"]}
          selectedIndex={this.state.selectedIndex}
          onPress={event => {
            this.setState({
              selectedIndex: event
            });
          }}
        />
        {this.props.loading ? (
          <ActivityIndicator animating={true} size="small" color={"#fff"} />
        ) : (
          <FlatList
          
            refreshControl={
              <RefreshControl
                refreshing={this.props.loading}
                onRefresh={this._onRefresh}
              />
            }
            data={
              this.state.selectedIndex === 0
                ? this.props.companies.approved
                : this.state.selectedIndex === 1
                ? this.props.companies.requested
                : []
            }
            renderItem={({ item }) => (
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.2)"]}
                style={styles.companyCard}
              >
                <Text
                  style={{
                    color: "#90F6DE",
                    fontWeight: "bold",
                    fontSize: 23,
                    fontFamily: "AvenirNext-DemiBold"
                  }}
                >
                  {item.nameInEnglish}
                </Text>
                <Text
                  style={{
                    color: "#79B0A3",
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
                    fontSize: 10,
                    position: "absolute",
                    top: 10,
                    right: 10,
                    alignSelf: "flex-end"
                  }}
                >
                  {item.legalCompanyForm}
                </Text>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    alignSelf: "flex-end"
                  }}
                  onPress={() => (
                    this.props.doOpenCompanyModal(),
                    this.props.doSetCompany(item)
                  )}
                >
                  <Text style={{ color: "#cccccc" }}>View details</Text>
                </TouchableOpacity>
              </LinearGradient>
            )}
            keyExtractor={item => {
              return item._id;
            }}
          />
        )}
      </View>
    );
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
      <>
        <StatusBar barStyle={"light-content"} />
        <Header
          backgroundColor={"#1C2632"}
          centerComponent={{
            text: "Companies",
            style: { color: "#74808E", fontWeight: "bold", fontSize: 20 }
          }}
          rightComponent={
            <Ionicons
              name={"ios-search"}
              onPress={() =>
                this.setState(prevState => ({ hi: !prevState.hi }))
              }
              size={20}
              color={"#74808E"}
            />
          }
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.companyModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <CompanyDetials />
        </Modal>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.hi}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "#1C2632", marginTop: 20 }}
            behavior="padding"
            enabled
          >
            <SearchBar
              ref={search => (this.search = search)}
              containerStyle={{ backgroundColor: "#1C2632" }}
              platform="ios"
              placeholder="Type Here..."
              onChangeText={this.updateSearch}
              value={this.state.search}
              inputContainerStyle={{ height: 20 }}
              onCancel={() => {
                this.setModalVisible(false);
              }}
              returnKeyType={"search"}
              on
              autoFocus={true}
            />
            <FlatList
              
              keyboardDismissMode={"on-drag"}
              keyboardShouldPersistTaps={"always"}
              refreshControl={
                <RefreshControl
                  refreshing={this.props.loading}
                  onRefresh={this._onRefresh}
                />
              }
              data={
                this.state.selectedIndex === 0
                  ? this.state.results
                  : this.state.selectedIndex === 1
                  ? this.state.results2
                  : []
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    height: 60,
                    paddingHorizontal: 10,
                    borderBottomColor: "#293749",
                    borderBottomWidth: 1,
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                  onPress={() => (
                    Keyboard.dismiss(),
                    this.setModalVisible(false),
                    this.props.doOpenCompanyModal(),
                    this.props.doSetCompany(item)
                  )}
                >
                  <Text style={{ color: "white", textAlignVertical: "top" }}>
                    {item.nameInEnglish} ({item.nameInArabic})
                  </Text>

                  <Text style={{ color: "#74808E" }}>{item.investorName}</Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#B7C1CD",
                      alignSelf: "flex-end",
                      right: 10,
                      bottom: 5,
                      position: "absolute"
                    }}
                  >
                    {item.status}
                  </Text>
                  <Text
                    style={{
                      color: "#74808E",
                      alignSelf: "flex-end",
                      right: 10,
                      top: 5,
                      position: "absolute"
                    }}
                  >
                    {item.legalCompanyForm}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => {
                return item._id;
              }}
            />
          </KeyboardAvoidingView>
        </Modal>

        {this.renderView()}
        <View>
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 0,
              alignSelf: "flex-end",
              shadowOpacity: 0.4,
              shadowRadius: 3,
              shadoOffset: {
                height: 3
              }
            }}
            onPress={() => this.setState({ filterVisible: true })}
          >
            <Ionicons name={"ios-funnel"} size={50} color={"#90F6DE"} />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.loginReducer.token,
    companies: state.companyReducer.companies,
    loading: state.loginReducer.loading,
    companyModalVisible: state.companyReducer.companyModalVisible
  };
};

const mapDispatchToProps = dispatch => ({
  doFetchReq: token => {
    dispatch(actions.fetchRequests(token));
  },
  doFetchComp: token => {
    dispatch(actions.fetchCompanies(token));
  },
  doSetCompany: company => {
    dispatch(actions.selectCompany(company));
  },
  doOpenCompanyModal: () => {
    dispatch(actions.openCompanyModal());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompaniesScreen);
