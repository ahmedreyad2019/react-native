import React from "react";
import {
  ScrollView,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Text,
  TouchableHighlight,
  StatusBar,
  Modal,
  View
} from "react-native";
import { Header, SearchBar } from "react-native-elements";
import { styles } from "../styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo";
import { connect } from "react-redux";
import * as actions from "../actions/index";
class FeedScreen extends React.Component {
  componentDidMount() {
    this.props.doFetchComp();
  }

  constructor(props) {
    super(props);
    this.state = {
      investor: null,
      loading: true,
      hi: false,
      refresh: false,
      data: []
    };
  }
  _onRefresh = () => {
    this.props.doFetchComp();
  };
  updateSearch = text => {
    var companies = this.props.allCompanies;

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

    this.setState({ results2: companies, search: text });
  };
  setModalVisible(visible) {
    console.log(this.props.allCompanies);
    this.setState({ hi: visible });
  }
  render() {
    return (
      <>
        <Header
          backgroundColor={"#1C2632"}
          centerComponent={{
            text: "Home",
            style: { color: "#74808E", fontWeight: "bold", fontSize: 20 }
          }}
          rightComponent={
            <Ionicons
              name={"ios-search"}
              onPress={() => {
                console.log(this.props.allCompanies[0]);
                this.setState(prevState => ({ hi: !prevState.hi }));
              }}
              size={20}
              color={"#74808E"}
            />
          }
        />

        <ScrollView
          bouncesZoom={true}
          pagingEnabled={true}
          contentContainerStyle={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            backgroundColor: "#1C2632"
          }}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.refresh}
          //     onRefresh={this._onRefresh}
          //   />
          // }
        >
          <View>
            <Text
              style={{ fontSize: 29, fontWeight: "bold", color: "#90F6DE" }}
            >
              Electronic Journal
            </Text>
          </View>
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
                autoFocus={true}
              />
              <FlatList
                keyboardDismissMode={"on-drag"}
                keyboardShouldPersistTaps={"always"}
                // refreshControl={
                //   <RefreshControl
                //     refreshing={this.props.loading}
                //     onRefresh={this._onRefresh}
                //   />
                // }
                data={this.state.results2}
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

                    <Text style={{ color: "#74808E" }}>
                      {item.investorName}
                    </Text>
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
          <View>
            <FlatList
              snapToInterval={300}
              bouncesZoom
              indicatorStyle={"white"}
              snapToAlignment={"center"}
              decelerationRate="fast"
              horizontal
              data={this.props.allCompanies}
              renderItem={({ item }) => (
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.2)"]}
                  style={{
                    ...styles.companyCard,
                    marginHorizontal: 10,
                    width: 280
                  }}
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
          </View>
        </ScrollView>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    allCompanies: state.companyReducer.allCompanies,
    loading: state.loginReducer.loading,
    companyModalVisible: state.companyReducer.companyModalVisible
  };
};

const mapDispatchToProps = dispatch => ({
  doFetchReq: token => {
    dispatch(actions.fetchRequests(token));
  },
  doFetchComp: () => {
    dispatch(actions.fetchAllCompanies());
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
)(FeedScreen);
