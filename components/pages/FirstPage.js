import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body, Form, Item, Input } from 'native-base'
import { colors } from '../../utils/colors'
import Registrationform from '../elements/RegistrationForm'



export default class Loginpage extends Component {
  constructor(props) {
  super(props)
  this.state = {
    email: '',
    password: '',
  }
}

  //LOGIN BUTTON
  onPressButton = () => {
    // Alert.alert('email:', this.state.email)
    // Alert.alert('password:', this.state.password)
    Actions.Homepage()
  }

  render() {

    return (
      <Container>
        <Header>
          <Left>
          </Left>
          <Body>
          </Body>
          <Right>
            <Text style={styles.repsyHeader}>REPSY</Text>
          </Right>
        </Header>
        <Content>
          <Text style={styles.repsyH1}>REPSY</Text>
          <Text style={styles.h2}>Connecting Doctors & Reps</Text>
          <Form>
            <Item >
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                style={styles.inputText}
                placeholder="Email"
                onChangeText={(text) => this.setState({email: text})}/>
            </Item>
            <Item last>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry={true}
                style={styles.inputText}
                placeholder="Password"
                onChangeText={(text) => this.setState({password: text})}/>
            </Item>
          </Form>
          <Button
            onPress={this.onPressButton}
            style={styles.loginButton}
            transparent>
          <Text style={styles.loginButtonText}>Login</Text>
        </Button>
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
  container: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: '#f7f7f7'
  },
  repsyH1: {
    fontFamily: 'Helvetica',
    fontSize: 55,
    textAlign: 'center',
    letterSpacing: 10,
    marginTop: '50%',
    color: 'rgb(96, 29, 16)',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5
  },
  h2: {
    fontFamily: 'Hoefler Text',
    fontSize: 20,
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: -5,
    marginBottom: 30
  },
  repsyHeader: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 20,
    color: 'rgb(96, 29, 16)'
  },
  inputText: {
    fontFamily: 'Helvetica',
    fontSize: 20,
  },
  loginButton: {
    justifyContent: 'center',
    alignSelf: 'center'
  },
  loginButtonText: {
    color: 'rgb(84, 157, 191)',
    fontFamily: 'Hoefler Text',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1,
  },
});
