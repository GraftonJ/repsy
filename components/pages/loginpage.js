import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body, Icon } from 'native-base'

import Registrationform from '../elements/RegistrationForm'
import RepRegistrationForm from '../elements/RepRegistrationForm'



export default class Loginpage extends Component {
  constructor(props) {
  super(props);
  this.state = {
    doctor: false,
    rep: false
  }
}

onPressDoctor = () => {
  this.setState({
    doctor: true,
    rep: false
  })
}
onPressRep = () => {
  this.setState({
    doctor: false,
    rep: true
  })
}
  render() {
    if(!this.state.doctor && !this.state.rep){
      return (
        <Container>
          <Header>
            <Left>
              <Button
                onPress={() => { Actions.pop() }}
                transparent>
                <Icon name="arrow-back" />
                </Button>
            </Left>
            <Body>
            </Body>
            <Right>
            </Right>
          </Header>
          <Content>
            <Text style={styles.welcome}>Welcome to Repsy!</Text>
            <Button onPress={() => this.onPressRep()}>
                <Text>
                  Sales Representative
                </Text>
            </Button>
            <Button onPress={() => this.onPressDoctor()}>
                <Text>
                  Doctor Account
                </Text>
              </Button>
          </Content>
          <Footer>
          </Footer>
        </Container>
      )
    }

  else {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              onPress={() => {
                this.setState({
                  doctor: false,
                  rep: false,
                })
              }
            } transparent>
              <Icon name="arrow-back" />
              </Button>
          </Left>
          <Body>
          </Body>
          <Right>
            {this.state.doctor
              ? <Button onPress={() => this.onPressRep()}>
                  <Text>
                    Switch to Sales Representative
                  </Text>
                </Button>
              : <Button onPress={() => this.onPressRep()}>
                  <Text>
                    Switch to Doctor
                  </Text>
                </Button>
            }
          </Right>
        </Header>
        <Content>
          <Text style={styles.welcome}>Welcome to Repsy!</Text>
          {this.state.doctor
            ? <Text style={styles.h2}>Create a Doctor Account</Text>
            : <Text style={styles.h2}>Create a Sales Rep Account</Text>
          }

          {this.state.doctor
            ? <Registrationform />
            : <RepRegistrationForm />
          }
        </Content>
        <Footer>
        </Footer>
      </Container>
      ) // End of Else return
    }//End of Else
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
