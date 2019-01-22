
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
    this.state = {}
  }

  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar= "false">
          <Scene key="Homepage" component={Homepage} />
          <Scene key="Loginpage" component={Loginpage} initial={true} />
        </Scene>
      </Router>
    )
  }
}

const styles = StyleSheet.create({

});
