
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { Container, Header, Content, Footer } from 'native-base'
import Homepage from './components/pages/homepage'
import Loginpage from './components/pages/loginpage'

// type Props = {};
export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      loading: true,
    }
  }
  /**
     * When the App component mounts, we listen for any authentication
     * state changes in Firebase.
     * Once subscribed, the 'user' parameter will either be null
     * (logged out) or an Object (logged in)
     */
    componentDidMount() {
      this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
        this.setState({
          loading: false,
          user,
        });
      });
    }

    /**
   * Don't forget to stop listening for authentication state changes
   * when the component unmounts.
   */
  componentWillUnmount() {
    this.authSubscription();
  }


  render() {
    return (
      // The application is initialising
    if (this.state.loading) return <Text>Loading</Text>;
    // The user exists, so they're logged in
    if (this.state.user) return <Text>Logged In</Text>;
    // The user is null, so they're logged out
    return <Text>Logged Out</Text>;
    )
  }
}

const styles = StyleSheet.create({

});
