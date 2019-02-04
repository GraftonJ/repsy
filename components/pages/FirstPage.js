import React, { Component } from 'react'
import { Platform, StyleSheet, View, Text, Dimensions, Alert, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Header, Content, Footer, Button, Left, Right, Body, Form, Item, Input, Spinner, Toast, StyleProvider } from 'native-base'
import { colors } from '../../utils/colors'
import Registrationform from '../elements/RegistrationForm'

import getTheme from '../../native-base-theme/components'
import material from '../../native-base-theme/variables/material'
import platform from '../../native-base-theme/variables/platform'

import store, { URI } from '../../store'


export default class Loginpage extends Component {
  constructor(props) {
  super(props)
  this.state = {
    email: '',
    password: '',
    loginErrorMessage: '',
    isLoggedIn: store.getState().isLoggedIn,
    user: store.getState().user,
    isLoading: false,
    error: false,
  }
}

//Dee@gmail.com Secret
/* ********************************************* */
//Checks store for isLoggedIn(bool), and user(obj)
componentDidMount() {
  console.log("Login::componentDidMount()")

  this.unsubscribe = store.onChange(() => {
    this.setState({
      isLoggedIn: store.getState().isLoggedIn,
      user: store.getState().user,
    })
  })
}

  /* ********************************************* */
  componentWillUnmount() {
    // disconnect from store notifications
    this.unsubscribe()
  }

  /* ********************************************* */
  async asyncTryLogin(email, password) {
    console.log("-- asyncTryLogin(): ", email, password)

    this.setState({
      loginErrorMsg: '',
    })

    const body = { email, password }
    const url = `${URI}/doctors/login`

    try {

      // call login route
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      const responseJson = await response.json()
      console.log('RESPONSEJSON', responseJson)

      // if the login fails, display error message
      if (!response.ok) {
        console.log('==== ', response.status, responseJson)
        this.setState({
          isLoading: false,
          loginErrorMsg: responseJson.error,
          error: true,
        })
        return false
      }

      // login succeeded!
      console.log("('==== login success!: ", responseJson.doctor)
      console.log('---- **** --- auth: ', response.headers.map.auth)

      // add the authHeader to user object since it will be passed in future fetch calls
      // responseJson.user.authHeader = response.headers.map.auth
      store.setState({
        user: responseJson.doctor,
        isLoggedIn: true,
      })
      return true
    }
    catch(err) {
      console.log("ERROR onpressLogin fetch failed: ", err)
    }
  }



  /* ********************************************* */
onPressLogin = async () => {
  console.log("Login::onpressLogin()")
  this.setState({
    isLoading: true,
  })

  const email = this.state.email.toLowerCase()
  const password = this.state.password

  const value = { email, password }
  console.log("value: ",value)

  // check that user filled in the fields
  if (!value) {
    return
  }


  const success = await this.asyncTryLogin(email, password)
  if (success) {
    console.log('YAAAAAAAYYYYY SUCCESS!')
    this.setState({
        email: '', // holds the form value
        password: '', // holds the form value
    })
    // store.setState({
    //   user:
    // })
    Actions.Homepage()
  }
  else{
    this.setState({
      isLoading: false
    })
  }
}


  //CREATE ACCOUNT BUTTON
  onPressCreateAccount = () => {
    Actions.Loginpage()
  }

  render() {
      return (
      <StyleProvider style={getTheme(platform)}>
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
          <Content scrollEnabled={false}>
            <Image style={styles.image} source={require('../../medicalStaff.png')} />
            <Text style={styles.repsyH1}>REPSY</Text>
            <Text style={styles.h2}>Connecting Doctors & Reps</Text>
            {(this.state.isLoading)
              ?
              <Spinner color='red' />
              :
            (this.state.error)
              ?
            <Container>
            <Form>
              <Text
                style={styles.validationMessage}>Incorrect Email or Password</Text>
              <Item error>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  style={styles.inputText}
                  placeholder="Email"
                  onChangeText={(text) => this.setState({email: text})}/>
              </Item>
              <Item error>
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
              dark
              onPress={this.onPressLogin}
              style={styles.loginButton}
            >
            <Text style={styles.loginButtonText}>Login</Text>
          </Button>
          <Text style={styles.Or}>or</Text>
          <Button
            onPress={this.onPressCreateAccount}
            style={styles.loginButton}
            transparent>
          <Text style={styles.createAccountText}>Create Account</Text>
         </Button>
         </Container>
         :
           <Container>
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
             bordered dark
             onPress={this.onPressLogin}
             style={styles.loginButton}
           >
           <Text style={styles.loginButtonText}>Login</Text>
           </Button>
           <Text style={styles.Or}>or</Text>
           <Button
             onPress={this.onPressCreateAccount}
             style={styles.loginButton}
             transparent>
           <Text style={styles.createAccountText}>Create Account</Text>
          </Button>
          </Container>
         }
          </Content>
          <Footer>
          </Footer>
        </Container>
      </StyleProvider>
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
    color: 'rgb(96, 29, 16)',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    // marginTop: '5%'
  },
  h2: {
    fontFamily: 'Hoefler Text',
    fontSize: 20,
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: -5,
    marginBottom: 30,
    color: 'rgb(84, 157, 191)'
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
  validationMessage: {
    fontFamily: 'Helvetica',
    fontSize: 15,
    color: 'rgb(96, 29, 16)',
    alignSelf: 'center',
  },
  loginButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,
    width: '40%'
  },
  loginButtonText: {
    color: 'rgb(84, 157, 191)',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 25,
    letterSpacing: 1,
  },
  createAccountText: {
    color: 'rgb(96, 29, 16)',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 15,
  },
  Or : {
    fontFamily: 'Hoefler Text',
    fontSize: 15,
    alignSelf: 'center',
    marginBottom: -30,
  },
  image: {
    alignSelf: 'center',
    // width: '25%',
    // height: '10%',
    width: 100,
    height: 110,
    marginTop: '25%'
  },
})
