import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  ImageBackground,
  Image,
  Alert,
  TouchableOpacity
} from 'react-native'

import store, { URI } from '../../store';

import t from 'tcomb-form-native'


import NewAccount from './NewAccount'

const Form = t.form.Form;
const User = t.struct({
  email: t.String,
  password: t.String,
})

const options = {
  fields: {
    password: {
      secureTextEntry: true,
    }
  }
}

// https://stackoverflow.com/questions/51977603/how-to-use-securetextentry-in-tcomb-form-native




export default class HomeSCR extends React.Component {

  /* ********************************************* */
  constructor(props) {
    super(props);
    this.state = {
      // connected to global store
      isLoggedIn: store.getState().isLoggedIn,
      user: store.getState().user,

      // local state
      isRegistering: false, // true to display registration screen
      value: { // this is used by the "Form" thing
        email: '', // holds the form value
        password: '', // holds the form value
      },
      // value: { // this is used by the "Form" thing
      //   email: 'nuser@gmail.com', // holds the form value
      //   password: 'secret', // holds the form value
      // },
      loginErrorMsg: '', // error message for failed login
    }
  }

  /* ********************************************* */
  componentDidMount() {
    console.log("Login::componentDidMount()");

    this.unsubscribe = store.onChange(() => {
      this.setState({
        isLoggedIn: store.getState().isLoggedIn,
        user: store.getState().user,
      })
    });

    // need to guard the set focus().  In development we may set the Store
    // to have a dummy user already logged in.  In that case render() won't
    // have rendered an email field so setting focus crashes the app
    if (!this.state.isLoggedIn)
      this.refs.myform.getComponent('email').refs.input.focus();
  }

  /* ********************************************* */
  componentWillUnmount() {
    // disconnect from store notifications
    this.unsubscribe();
  }

  /* ********************************************* */
  async asyncTryLogin(email, password) {
    console.log("-- asyncTryLogin(): ", email, password);

    this.setState({
      loginErrorMsg: '',
    })

    const body = { email, password };
    const url = `${URI}/users/login`;

    try {

      // call login route
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const responseJson = await response.json();

      // if the login fails, display error message
      if (!response.ok) {
        console.log('==== ', response.status, responseJson);
        this.setState({
          loginErrorMsg: responseJson.error,
        })
        return false;
      }

      // login succeeded!
      console.log("('==== login success!: ", responseJson.user);
      console.log('---- **** --- auth: ', response.headers.map.auth);

      // add the authHeader to user object since it will be passed in future fetch calls
      responseJson.user.authHeader = response.headers.map.auth;
      responseJson.user.dogNames = responseJson.user.dog_names; // kludge b/c the comments expect 'dogNames'
      store.setState({
        user: responseJson.user,
        isLoggedIn: true,
      });
      return true;
    }
    catch(err) {
      console.log("ERROR onpressLogin fetch failed: ", err);
    }
  }

  /* ********************************************* */
  onpressLogin = async () => {
    console.log("Login::onpressLogin()");

    var value = this.refs.myform.getValue();
    console.log("value: ",value);

    // check that user filled in the fields
    if (!value) {
      return;
    }
    const { email, password } = value;
    const success = await this.asyncTryLogin(email, password);
    console.log();
    if (success) {
      this.setState({
        value: { // this is used by the "Form" thing
          email: '', // holds the form value
          password: '', // holds the form value
        },
      })
      this.props.navigate('SearchScreens');
    }
  }

  /* ********************************************* */
  onpressLogout =  () => {
    console.log("Login::onpressLogout()");

    store.setState({
      user: null,
      isLoggedIn: false,

      isCheckedIn: false,
      checkinLocationId: '',
      checkinLocationName: '',
    })
  }

  /* ********************************************** */
  // tracks changes to the form fields
  onChange = (value) => {
    // console.log('xxxx onChange(): ', value);
    this.setState({value});
  }

  /* ********************************************** */
  // callback from the NewAccount component,
  //   reset flag so if they logout they'll get to the login component
  //   not back to the NewAccount component.
  //   IE, flow should be:  Login -> New Account -> Logout -> Login
  //                  not:  Login -> New Account -> Logout -> New Account
  /* ********************************************** */
  newAccountAdded = () => {
    this.setState({
      isRegistering: false,
    })

    this.props.navigate('SearchScreens');
  }

  /* ********************************************** */
  onpressNewAccount = () => {
    console.log("onpressNewAccount()");
    this.setState({
      isRegistering: true,
    })
  }

  /* ***Î****************************************** */
  onpressNewAccountCancel = () => {
    console.log("onpressNewAccountCancel()");
    this.setState({
      isRegistering: false,
    })
  }

  /* ********************************************* */
  render() {
    console.log("render");
    const { loginErrorMsg } = this.state;
    const displayErrorMessage = 0 !== loginErrorMsg.length;

    // if logged in, display Logout button
    // ===================================
    if (this.state.isLoggedIn) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.circle}>
            <Image style={styles.image} source={require('../../assets/images/loginDog.jpg')} />
          </View>
          <Text style={styles.text}>Logout?</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onpressLogout}>
            <Text >Logout</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )
    }

    // if registering as new user in, display registration page
    // ========================================================
    if (this.state.isRegistering) {
      return (
        <NewAccount newAccountAddedCB={this.newAccountAdded} onpressCancelCB={this.onpressNewAccountCancel}/>
      )
    }

    // if not logged in, display Login form
    // ====================================
    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.circle}>
          <Image style={styles.image} source={require('../../assets/images/loginDog.jpg')} />
        </View>

        <Text style={styles.text}>Login, WOOF!</Text>

        <View style={{ width: '85%' }}>
          <Form
            ref="myform"
            options={options}
            style={styles.form}
            value={this.state.value}
            onChange={this.onChange}
            type={User} />
        </View>
        {displayErrorMessage && (
          <Text style={styles.errorMessage}>{loginErrorMsg}</Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={this.onpressLogin}>
          <Text >Login</Text>
        </TouchableOpacity>

        <Text style={[styles.newAccount, { marginBottom: 5 }]}>or</Text>

        <TouchableOpacity
          onPress={this.onpressNewAccount}>
          <Text style={styles.newAccount} >Create New Account</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  };
}
