import React from 'react';
import firebase from 'react-native-firebase';
// Components and screens
// - contents outside the scope of this tutorial
import LoadingIndicator from './components/LoadingIndicator';
import Homepage from './components/pages/homepage';
import Loginpage from './components/pages/loginpage';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
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
    // The application is initialising
    if (this.state.loading) return <LoadingIndicator />;
    // The user exists, so they're logged in
    if (this.state.user) return <Loginpage />;
    // The user is null, so they're logged out
    return <Loginpage />;
  }
}


//
// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';
// import { Router, Scene } from 'react-native-router-flux';
// import { Container, Header, Content, Footer } from 'native-base'
//
// import Homepage from './components/pages/homepage'
// import Loginpage from './components/pages/loginpage'
// import ConditionsPage from './components/pages/ConditionsPage'
// import MedicationsPage from './components/pages/MedicationsPage'
// import ConditionsLibrary from './components/pages/ConditionsLibrary'
// import ClinicalData from './components/pages/ClinicalDataPage'
// import RequestsPage from './components/pages/RequestsPage'
//
// export default class App extends Component {
//
//   constructor(props){
//     super(props)
//     this.state = {},
//     current_cancer = ''
//   }
//
//   render() {
//     return (
//       <Router>
//         <Scene key="root" hideNavBar= "false">
//           <Scene key="Homepage" component={Homepage} />
//           <Scene key="Loginpage" component={Loginpage} initial />
//           <Scene key="ConditionsPage" component={ConditionsPage} />
//           <Scene key="MedicationsPage" component={MedicationsPage} />
//           <Scene key="ConditionsLibrary" component={ConditionsLibrary} />
//           <Scene key="ClinicalData" component={ClinicalData} />
//           <Scene key="RequestsPage" component={RequestsPage} />
//         </Scene>
//       </Router>
//     )
//   }
// }
//
// const styles = StyleSheet.create({
//
// });
