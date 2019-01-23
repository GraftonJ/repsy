import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body } from 'native-base'

import Registrationform from '../elements/RegistrationForm'

export default class Loginpage extends Component {

  render() {

    return (
      <Container>
        <Header>
          <Left>
            <Button
              onPress={() => {Actions.Homepage()}}>
              <Text>Homepage</Text>
            </Button>
          </Left>
          <Body>
          </Body>
          <Right>
            <Text style={styles.repsyHeader}>REPSY</Text>
          </Right>
        </Header>
        <Content>
          <Text style={styles.welcome}>Welcome to Repsy!</Text>
          <Text style={styles.h2}>Create an Account</Text>
          <Registrationform />
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
  welcome: {
    fontFamily: 'Helvetica',
    fontSize: 25,
    textAlign: 'center',
    letterSpacing: 1,
    marginTop: 40,
  },
  h2: {
    fontFamily: 'Helvetica',
    fontSize: 15,
    textAlign: 'center',
    letterSpacing: 1,
    marginTop: -2,
    marginBottom: 30
  },
  repsyHeader: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 20,
    color: 'rgb(96, 29, 16)'
  }
});
