
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
import SelectedMedication from './components/pages/SelectedMedication'
import MedsLibrary from './components/pages/MedsLibrary'

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
          <Scene key="Loginpage" component={Loginpage} initial />
          <Scene key="ConditionsPage" component={ConditionsPage} />
          <Scene key="MedicationsPage" component={MedicationsPage} />
          <Scene key="ConditionsLibrary" component={ConditionsLibrary} />
          <Scene key="ClinicalData" component={ClinicalData} />
          <Scene key="RequestsPage" component={RequestsPage} />
          <Scene key="SelectedMedication" component={SelectedMedication} />
          <Scene key="MedsLibrary" component={MedsLibrary} />
        </Scene>
      </Router>
    )
  }
}

const styles = StyleSheet.create({

});
