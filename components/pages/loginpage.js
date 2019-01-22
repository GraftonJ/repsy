import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions, TextInput, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Left, Body, Right, Footer, Content, Form, Item, Input } from 'native-base'
import firebase from 'react-native-firebase';

export default class Loginpage extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      username: '',
      password: '',
    }
  }
  onRegister = () => {
  firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password)
    .then((user) => {
      
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch((error) => {
      const { code, message } = error;
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
}

  render() {

    return (
      <Container>
        <Header>
          <Left>
            <Button
              title='Home'
              onPress={() => {Actions.Homepage()}}>
              <Text>Homepage</Text>
            </Button>
          </Left>
          <Body>
            <Text>Loginpage</Text>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
            <TextInput
              style={{height: 40}}
              placeholder="username"
              onChangeText={(username) => this.setState({username})}
            />
            <Text>{this.state.password}</Text>
            <TextInput
              style={{height: 40}}
              placeholder="Password"
              onChangeText={(password) => this.setState({password})}
            />
            <Button title='Submit' onPress={this.onRegister} />
        </Content>
        <Footer>
        </Footer>
      </Container>
    ) // End of return
  } // End of render

} // End of componenet

// Variables to changes the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

// Put styles in here to format the page
const styles = StyleSheet.create({

});
