
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { Container, Header, Content, Footer } from 'native-base'

import Homepage from './components/pages/homepage'
import Loginpage from './components/pages/loginpage'
import ConditionsPage from './components/pages/ConditionsPage'
import MedicationsPage from './components/pages/MedicationsPage'
import ConditionsLibrary from './components/pages/ConditionsLibrary'
import ClinicalData from './components/pages/ClinicalDataPage'
import RequestsPage from './components/pages/RequestsPage'
import firebase from 'react-native-firebase';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
     this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
       this.setState({
         loading: false,
         user,
       });
     });
   }

   componentWillUnmount() {
     this.authSubscription();
   }

 render() {
  if (this.state.loading) return <Loginpage />;
  if (this.state.user) return <Homepage />
  return <Loginpage />;
}
}
