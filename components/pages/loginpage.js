import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body, Icon, StyleProvider } from 'native-base'

import getTheme from '../../native-base-theme/components'
import material from '../../native-base-theme/variables/material'
import platform from '../../native-base-theme/variables/platform'

import Registrationform from '../elements/RegistrationForm'
import RepRegistrationForm from '../elements/RepRegistrationForm'

import { Image } from 'react-native'



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
    // First Determine type of account
    if(!this.state.doctor && !this.state.rep){
      return (
        <StyleProvider style={getTheme(platform)}>
        <Container>
          <Header>
            <Left>
              <Button
                onPress={() => { Actions.pop() }}
                transparent>
                <Icon name="arrow-back" style={{ color: "rgb(84, 157, 191)" }}/>
                </Button>
            </Left>
            <Body>
            </Body>
            <Right>
              <Text style={styles.repsyHeader}>REPSY</Text>
            </Right>
          </Header>
            <Content>
              <Image style={styles.image} source={require('../../medicalStaff.png')} />
              <Text style={styles.repsyH1}>REPSY</Text>
              <View style={styles.contentContainer}>
                <Text style={styles.welcome}>
                  Which Type of Account?
                </Text>
                <View style={styles.buttonContainer}>
                  <Button block style={styles.typeButton} onPress={() => this.onPressRep()}>
                      <Text style={styles.typeButtonText}>
                        Sales
                      </Text>
                  </Button>
                  <Button block style={styles.typeButton} onPress={() => this.onPressDoctor()}>
                      <Text style={styles.typeButtonText}>
                        Doctor
                      </Text>
                  </Button>
                </View>
              </View>
            </Content>
          <Footer>
          </Footer>
        </Container>
      </StyleProvider>
      )
    }
  else {
    //Show form fields for correct account type
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
              <Icon name="arrow-back" style={{ color: "rgb(84, 157, 191)" }}/>
              </Button>
          </Left>
          <Body>
          </Body>
          <Right>
            <Text style={styles.repsyHeader}>REPSY</Text>
          </Right>
        </Header>
          <Content>
            <Text style={styles.welcome}>
              Welcome to Repsy!
            </Text>
            {this.state.doctor
              ? <Text style={styles.h2}>
                  Create a Doctor Account
                </Text>
              : <Text style={styles.h2}>
                  Create a Sales Rep Account
                </Text>
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
  // contentContainer: {
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   // height: height * .5
  // },
  welcome: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    textAlign: 'center',
    // letterSpacing: 1,
    color: 'rgb(96, 29, 16)',
    marginBottom: '8%',
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
    color: 'rgb(96, 29, 16)',
  },
  // buttonContainer: {
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   // alignItems: 'center'
  // },
  typeButton : {
    marginBottom: '5%',
    width: '90%',
    height: '30%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  typeButtonText: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Hoefler Text',
    fontSize: 25,
    letterSpacing: 2,
  },
  repsyH1: {
    fontFamily: 'Helvetica',
    fontSize: 35,
    textAlign: 'center',
    letterSpacing: 10,
    color: 'rgb(96, 29, 16)',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    marginBottom: '15%',
  },
  image: {
    alignSelf: 'center',
    width: 80,
    height: 90,
    marginTop: '10%'
  },
});
