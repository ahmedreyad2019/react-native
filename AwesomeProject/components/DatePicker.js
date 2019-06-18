import React, { Component } from "react";
import { View, DatePickerIOS, TouchableOpacity, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as actions from "../actions/index";
import { connect } from "react-redux";

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column-reverse" }}>
        <View
          style={{
            backgroundColor: "#d1d5db"
          }}
        >
          <View
            style={{
              height: 30,
              backgroundColor: "#fff",
              borderBottomWidth: 1,
              borderBottomColor: "#74808E",
              borderTopWidth: 2
            }}
          />
          <DatePickerIOS
            mode={"date"}
            date={new Date(this.props.user.dob)}
            onDateChange={newDate => this.setState({ chosenDate: newDate })}
          />

          <Ionicons
            name={"ios-close"}
            size={40}
            color={"#F08080"}
            style={{
              position: "absolute",
              top: 0,
              right: 15
            }}
            onPress={() => this.props.doCloseDateModal()}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.loginReducer.user,
    token: state.loginReducer.token,
    companies: state.companyReducer.companies,
    loading: state.loginReducer.loading,
    selectedCompany: state.companyReducer.selectedCompany
  };
};

const mapDispatchToProps = dispatch => ({
  doCloseDateModal: () => {
    dispatch(actions.closeDateModal());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatePicker);
