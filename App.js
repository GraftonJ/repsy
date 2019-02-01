import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import {
  Container,
  Header,
  Content,
  Footer,
  Root,
} from 'native-base';

import FirstPage from './components/pages/FirstPage'
import RepsList from './components/pages/RepsList'
import Homepage from './components/pages/homepage'
import Loginpage from './components/pages/loginpage'
import ConditionsPage from './components/pages/ConditionsPage'
import MedicationsPage from './components/pages/MedicationsPage'
import ConditionsLibrary from './components/pages/ConditionsLibrary'
import ClinicalData from './components/pages/ClinicalDataPage'
import RequestsPage from './components/pages/RequestsPage'
import SelectedMedication from './components/pages/SelectedMedication'
import MedsLibrary from './components/pages/MedsLibrary'
import RepDetail from './components/pages/RepDetail'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
    <Root>
      <Router>
        <Scene key="root" hideNavBar= "false">
          <Scene key="FirstPage" component={FirstPage} initial/>
          <Scene key="RepDetail" component={RepDetail}  />
          <Scene key="Homepage" component={Homepage} />
          <Scene key="RepsList" component={RepsList} />
          <Scene key="Loginpage" component={Loginpage}/>
          <Scene key="ConditionsPage" component={ConditionsPage}  />
          <Scene key="MedicationsPage" component={MedicationsPage} />
          <Scene key="ConditionsLibrary" component={ConditionsLibrary} />
          <Scene key="ClinicalData" component={ClinicalData}  />
          <Scene key="RequestsPage" component={RequestsPage} />
          <Scene key="SelectedMedication" component={SelectedMedication} />
          <Scene key="MedsLibrary" component={MedsLibrary} />
        </Scene>
      </Router>
    </Root>
    )
  }
}

const styles = StyleSheet.create({

});
