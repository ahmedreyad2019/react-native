import React from "react";
import {
  ScrollView,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
  RefreshControl,Text
} from "react-native";
import { ListItem } from "react-native-elements";

class LinksScreen extends React.Component {
  _onPressButton() {
    Alert.alert(" fucking");
  }

  _onLongPressButton() {
    Alert.alert("You long-pressed the button!");
  }
  componentDidMount(){
    fetch("http://serverbrogrammers.herokuapp.com/api/company")
      .then(response => response.json())
      .then(response => {
        this.setState({
          companies: response.data,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {});
  }
  _onPressIn=()=> {
    this.setState({pressing: true});
    }
  _onPressOut=()=> {
    this.setState({pressing: false});
    }
  constructor(props) {
    super(props);
    this.state = { companies: [], loading: true ,pressing:false};
  }
  render() {
    const {navigate} = this.props.navigation;

    return (
      <ScrollView
      refreshControl={
        <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
        />
      }
      >
      {this.handleReq}
        <ActivityIndicator size="small" animating={this.state.loading} />

        {this.state.companies.map((l, i) => (
          <TouchableHighlight
      
          >
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.investorName } }}
              title={l.nameInEnglish}
              subtitle={l.nameInArabic}
            />
          </TouchableHighlight>
        ))}
      </ScrollView>
    );
  }
}

export default LinksScreen;
