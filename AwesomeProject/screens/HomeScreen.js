import React from "react";
import {
  TextInput,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const styles = {
  text: {
    height: 60,
    backgroundColor: "#D5EAFA",
    borderStyle: "solid",
    borderColor: "#D5EAFA",
    borderWidth: "1",
    borderRadius: "30px",
    padding: 18,
    marginBottom: 30,
  },
  button:{
    alignItems: 'center',
    height: 50,
    backgroundColor: "#1B79F3",
    borderStyle: "solid",
    borderColor: "#1B79F3",
    borderWidth: "1",
    borderRadius: "30px",
    padding: 15,
    marginBottom: 30,
  }
};

export default class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { email:'',password:'' ,c:true,loggedin:false};
  }
  handleEmail=(event)=>{
    this.setState({email:event})
  }
  handlePassword=(event)=>{
    this.setState({password:event})
  }  
  handleSubmit=()=>{
    const {navigate} = this.props.navigation;

    console.log(this.state)
    fetch('https://serverbrogrammers.herokuapp.com/api/investors/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json().then(data => {
        if (data.auth) {
          this.setState(
            {
             loggedin:true
            }
          )
          console.log('success')
           navigate('Profile')
        } 
      })
    })
  }


  
  render() {
    return (
        <View
          style={{
            backgroundColor: "#14598D",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
            padding:30
          }}
        >
      <KeyboardAvoidingView behavior="padding" enabled>
          <View>
            <TextInput
              style={styles.text}
              placeholder="Email"
              onChangeText={text => this.handleEmail(text)}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.text}
              placeholder="Password"
              onChangeText={text => this.handlePassword(text)}
              textContentType="password"
              secureTextEntry="true"
              onChange={this.handlePassword}
            />
          </View>
          <View style={{paddingHorizontal:60}}>
          <TouchableOpacity
         style={styles.button}
         onPress={this.handleSubmit}
       >
         <Text style={{color:'white'}}> Sign in </Text>
       </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
        </View>
    );
  }
}
