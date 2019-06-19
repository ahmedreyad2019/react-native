import React from "react";
import {
  ScrollView,
  FlatList,
  Alert,
  TouchableOpacity,
  RefreshControl,
  Text,
  StatusBar,
  Modal,
  View
} from "react-native";
import { Header } from "react-native-elements";
import { styles } from "../styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import CompanyDetials from "../components/CompanyDetails";
import SearchModal from "../components/SearchModal";

class FeedScreen extends React.Component {
  componentDidMount() {
    this.props.doFetchComp();
    console.log(this.props.navigation.state.routeName);
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

  render() {
    return (
      
       <View style={{ flex: 1, backgroundColor: "#1C2632" }}>
        <Header
          backgroundColor={"#1C2632"}
          centerComponent={{
            text: "Home",
            style: { color: "#74808E", fontWeight: "bold", fontSize: 20 }
          }}
          rightComponent={
            <Ionicons
              name={"ios-search"}
              onPress={() => 
                (this.props.doOpenSearchModal(),this.props.doSetSource('FeedScreen'))
              }
              size={20}
              color={"#74808E"}
            />
          }
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.searchModalVisible}
         key={2}
        >
          <SearchModal  key={4}/>
        </Modal>
        <ScrollView
          bouncesZoom={true}
          pagingEnabled={true}
          contentContainerStyle={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            backgroundColor: "#1C2632"
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this._onRefresh}
            />
          }
        >
          <StatusBar barStyle={"light-content"} />
          <>
            <View>
              <Text
                style={{ fontSize: 29, fontWeight: "bold", color: "#90F6DE" }}
              >
                Electronic Journal
              </Text>
            </View>

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
          </>
        </ScrollView>
        </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    allCompanies: state.companyReducer.allCompanies,
    loading: state.loginReducer.loading,
    companyModalVisible: state.companyReducer.companyModalVisible,
    searchModalVisible: state.companyReducer.searchModalVisible,
    source:state.companyReducer.source
  };
};

const mapDispatchToProps = dispatch => ({
  doFetchComp: () => {
    dispatch(actions.fetchAllCompanies());
  },
  doSetCompany: company => {
    dispatch(actions.selectCompany(company));
  },
  doOpenCompanyModal: () => {
    dispatch(actions.openCompanyModal());
  },
  doOpenSearchModal: () => {
    dispatch(actions.openSearchModal());
  },
  doSetSource: (source) => {
    dispatch(actions.setSource(source));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedScreen);
