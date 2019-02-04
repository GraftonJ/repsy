import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions, InputText, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body, Form, Icon, Picker, Item, Input, StyleProvider } from 'native-base'

import getTheme from '../../native-base-theme/components'
import material from '../../native-base-theme/variables/material'
import platform from '../../native-base-theme/variables/platform'

import store, { URI } from '../../store'

export default class RepRegistrationForm extends Component {
  constructor(props) {
  super(props);
  this.state = {
      // local state
      // ---------------
    errorMessage: '',
    // Field keys match db table fields
      fname: '', // holds the form value
      lname: '',
      company: '',
      credentials: '',
      city: '',
      state: '',
      zip: 0,
      email: '',
      password: '',
      reps_photo: '',
      isLoggedIn: store.getState().isLoggedIn,
      user: store.getState.user
  }
}


/***********************************/
async componentDidMount(){


}


// /************************************/
//ADD Rep FUNCTION
async asyncTryAddRep() {
  console.log("---------- asyncTryAddRep(): ")
  this.setState({
    errorMessage: '',
  })

  const body = {
    fname: this.state.fname,
    lname: this.state.lname,
    company: this.state.company,
    credentials: this.state.credentials,
    city: this.state.city,
    state: this.state.state,
    zip: this.state.zip,
    email: this.state.email,
    password: this.state.password,
    //reps_photo: this.state.reps_photo
  }
  const url = `${URI}/reps`

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
    //responeJson = {id: 8, fname: sherman, lname: potter...}

    // if the new account fails, display error message
    if (!response.ok) {
      console.log('==== ', response.status, responseJson);
      this.setState({
        errorMessage: responseJson.error,
      })
      return
    }

    // new account succeeded!
    if(response.ok) {
      console.log('++++++++++++ new account added!', responseJson)
      store.setState({
        isLoggedIn: true,
        user: responseJson
      })
      console.log('*****store isLoggedIn', store.getState().isLoggedIn)
      console.log('******store user', store.getState().user)
      Actions.Homepage()
    }
  }
  catch(err) {
    console.log("ERROR asyncTryAddUser fetch failed: ", err)
  }
}
//
// /* ***Î****************************************** */
onpressSubmit = async () => {
  console.log('************onpressSubmit()')
  console.log('TRYING TO ADD Rep')
  await this.asyncTryAddRep()
}

  render() {

    return (
      <StyleProvider style={getTheme(platform)}>
        <Content>
          <Form >
            <Item>
              <Input
                autoCorrect={false}
                onChangeText={(text) => this.setState({fname: text})}
                placeholder="First Name"
                />
            </Item>
            <Item>
              <Input
                autoCorrect={false}
                onChangeText={(text) => this.setState({lname: text})}
                placeholder="Last Name" />
            </Item>
           <Item>
             <Input
               autoCorrect={false}
               onChangeText={(text) => this.setState({company: text})}
               placeholder="Company" />
           </Item>
           <Item>
             <Input
               autoCorrect={false}
               onChangeText={(text) => this.setState({credentials: text})}
               placeholder="Credentials" />
           </Item>
           <Item>
             <Input
               autoCorrect={false}
               onChangeText={(text) => this.setState({reps_photo: text})}
               placeholder="Photo URL" />
           </Item>
           <Item>
             <Input
               autoCorrect={false}
               onChangeText={(text) => this.setState({city: text})}
               placeholder="City" />
           </Item>
           <Item>
             <Input
               autoCorrect={false}
               onChangeText={(text) => this.setState({state: text})}
               placeholder="State" />
           </Item>
           <Item>
             <Input
               onChangeText={(text) => this.setState({zip: text})}
               placeholder="Zip" />
           </Item>
           <Item>
             <Input
               autoCapitalize="none"
               autoCorrect={false}
               onChangeText={(text) => this.setState({email: text})}
               placeholder="Email" />
           </Item>
           <Item>
             <Input
               autoCapitalize="none"
               autoCorrect={false}
               secureTextEntry={true}
               onChangeText={(text) => this.setState({password: text})}
               placeholder="Password" />
           </Item>
           <Button
             block
             onPress={this.onpressSubmit}
             type="submit"
             style={styles.submitButton}>
             <Text
               style={styles.submitText}>Submit</Text>
          </Button>
        </Form>
        </Content>
      </StyleProvider>
    ) // End of return
  } // End of render

} // End of componenet

// Variables to changes the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

// Put styles in here to format the page
const styles = StyleSheet.create({
  submitButton: {
    marginTop: '5%',

  },
  submitText: {
    fontFamily: 'Hoefler Text',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: 'white',
    marginTop: 6,
  }
});
