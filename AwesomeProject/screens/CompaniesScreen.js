import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  RefreshControl,
  Modal,
  StatusBar
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "../styles";
import { Header, ButtonGroup } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import CompanyDetials from "../components/CompanyDetails";
import Filter from "../components/Filter";
import { LinearGradient } from "expo";
import SearchModal from "../components/SearchModal";
class CompaniesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
    console.log(this.props.navigation.state.routeName);
  }
  makeRemoteRequest = () => {
    this.props.doFetchReq();
    this.props.doFetchComp();
  };

  _onRefresh = () => {
    this.makeRemoteRequest();
  };
  renderView = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "#1C2632" }}>
        <ButtonGroup
          selectedButtonStyle={{
            borderBottomWidth: 3,
            backgroundColor: "#1C2632",
            borderBottomColor: "#90F6DE"
          }}
          innerBorderStyle={{ width: 0 }}
          selectedTextStyle={{ color: "#90F6DE", fontWeight: "bold" }}
          containerStyle={{
            backgroundColor: "#1C2632",
            borderWidth: 0,
            borderBottomWidth: 0.5,
            borderBottomColor: "#74808E"
          }}
          buttons={["Approved", "Requested", "Create"]}
          selectedIndex={this.state.selectedIndex}
          onPress={event => {
            this.setState({
              selectedIndex: event
            });
          }}
        />

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
                  this.props.doOpenCompanyModal(), this.props.doSetCompany(item)
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
    );
  };

  render() {
    return (
      <>
        <Header
          backgroundColor={"#1C2632"}
          centerComponent={{
            text: "Companies",
            style: { color: "#74808E", fontWeight: "bold", fontSize: 20 }
          }}
          rightComponent={
            <Ionicons
              name={"ios-search"}
              onPress={() => (this.props.doOpenSearchModal(),this.props.doSetSource('companiesScreen'))}
              size={25}
              color={"#74808E"}
            />
          }
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.searchModalVisible}
          key={1}
        >
          <SearchModal />
        </Modal>
        <StatusBar barStyle={"light-content"} />
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
          animationType="slide"
          transparent={true}
          visible={this.props.filterModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <Filter />
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
            onPress={() => this.props.doOpenFilterModal()}
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
    userId: state.loginReducer.userId,
    user: state.loginReducer.user,
    companies: state.companyReducer.companies,
    loading: state.loginReducer.loading,
    companyModalVisible: state.companyReducer.companyModalVisible,
    filterModalVisible: state.companyReducer.filterModalVisible,
    searchModalVisible: state.companyReducer.searchModalVisible,
    order: state.companyReducer.order,
    allCompanies: state.companyReducer.allCompanies
  };
};

const mapDispatchToProps = dispatch => ({
  doFetchReq: () => {
    dispatch(actions.fetchRequests());
  },
  doFetchComp: () => {
    dispatch(actions.fetchCompanies());
  },
  doSetCompany: company => {
    dispatch(actions.selectCompany(company));
  },
  doSetCompanies: company => {
    dispatch(actions.setCompanies(company));
  },
  doSetRequests: () => {
    dispatch(actions.setRequests());
  },
  doOpenSearchModal: () => {
    dispatch(actions.openSearchModal());
  },
  doOpenCompanyModal: () => {
    dispatch(actions.openCompanyModal());
  },
  doOpenFilterModal: () => {
    dispatch(actions.openFilterModal());
  },
  doSetSource: (source) => {
    dispatch(actions.setSource(source));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompaniesScreen);
