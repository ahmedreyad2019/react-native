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
            backgroundColor: "#ccc"
          }}
        >
          <DatePickerIOS
            mode={"date"}
            date={new Date(this.props.user.dob)}
            onDateChange={newDate => this.setState({ chosenDate: newDate })}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 0,
              right: 15,
              alignSelf: "flex-end",
              shadowOpacity: 0.4,
              shadowRadius: 3,
              shadoOffset: {
                height: 3
              }
            }}
            onPress={() => this.props.doCloseDateModal()}
          >
            <Ionicons name={"ios-close"} size={40} color={"#90F6DE"} />
          </TouchableOpacity>
         
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
