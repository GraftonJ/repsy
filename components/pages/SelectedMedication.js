// React Native and Native modules for page
import React, { Component } from 'react';
import {Alert, Platform, StyleSheet, Image, View, Dimensions, AsyncStorage, FlatList} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body, Text, Picker, Form, Icon, StyleProvider } from 'native-base'
import ModalDropdown from 'react-native-modal-dropdown';

import getTheme from '../../native-base-theme/components'
import material from '../../native-base-theme/variables/material'
import platform from '../../native-base-theme/variables/platform'

// Accesses the store and api
import { getMeds } from '../../utils/api'
import { getRepsMed } from '../../utils/api'

import store, { URI } from '../../store'

// Imports the footer navbar at the bottom
import FooterMenu from '../elements/FooterMenu'

export default class SelectedMedication extends Component {

  // * *********************************** * //
  constructor(props) {
    super(props);
    this.state = {
      reps: store.getState().reps,
      meds: [],
      desired_info: store.getState().desired_info
    };
  }

  // * *********************************** * //
  async componentDidMount(){
    const response = await fetch(`${URI}/meds`)
    const json = await getMeds()
    this.setState({meds: json})

    this.unsubscribe = store.onChange(() => {
      this.setState({
        desired_info: store.getState().desired_info
      })
    })
  }

  // * *********************************** * //
  componentWillUnmount(){
    //disconnect from store notifications
    this.unsubscribe()
  }

  // * *********************************** * //
  // Handles when the user presses Dosing
  // Has to update old object keys into state to keep data across pages
  onpressDosing = () => {
    console.log('onpressDosing()');
    store.setState({
      desired_info: {
        ...store.getState().desired_info,
        label: 'Dosing',
        linkkey: 'dosing'
      }
    });
    Actions.ClinicalData()
  }

  // * *********************************** * //
  // Handles when the user presses Trial Design
  // Has to update old object keys into state to keep data across pages
  onpressTrialDesign = () => {
    console.log('onpressTrialDesign()');
    store.setState({
      desired_info: {
        ...store.getState().desired_info,
        label: 'Trial Design',
        linkkey: 'trial_design'
      }
    });
    Actions.ClinicalData()
  }

  // * *********************************** * //
  // Handles when the user presses Efficacy
  // Has to update old object keys into state to keep data across pages
  onpressEfficacy = () => {
    console.log('onpressEfficacy()');
    store.setState({
      desired_info: {
        ...store.getState().desired_info,
        label: 'Efficacy',
        linkkey: 'efficacy'
      }
    });
    Actions.ClinicalData()
  }

  // * *********************************** * //
  // Handles when the user presses Mechanism of Action
  // Has to update old object keys into state to keep data across pages
  onpressMechanismOfAction = () => {
    console.log('onpressMechanismOfAction()');
    store.setState({
      desired_info: {
        ...store.getState().desired_info,
        label: 'Mechanism of Action',
        linkkey: 'mechanism_of_action'
      }
    });
    Actions.ClinicalData()
  }

  // * *********************************** * //
  // Handles when the user presses Patient Types
  // Has to update old object keys into state to keep data across pages
  onpressPatientTypes = () => {
    console.log('onpressPatientTypes()');
    store.setState({
      desired_info: {
        ...store.getState().desired_info,
        label: 'Patient Types',
        linkkey: 'patient_types'
      }
    });
    Actions.ClinicalData()
  }

  // * *********************************** * //
  // Handles when the user presses Safety
  // Has to update old object keys into state to keep data across pages
  onpressSafety = () => {
    console.log('onpressSafety()');
    store.setState({
      desired_info: {
        ...store.getState().desired_info,
        label: 'Safety',
        linkkey: 'safety'
      }
    });
    Actions.ClinicalData()
  }

    // * *********************************** * //
    onPressBackButton = () => {
      store.setState({
        desired_info: {
          ...store.getState().desired_info,
        }
      });
      Actions.pop()
    }

    //Helper function to check if there is more than one rep for the med. If so, render the list view. If not, go straight to the RepDetail componenet. If no reps, Alert.
    checkReps = () => {
      let availReps = store.getState().reps.length
      if(!availReps){
        Alert.alert('Sorry, there are no representatives at this time')
      }
      else if(availReps > 1) {
        Actions.RepsList()
      }
      else {
        console.log('ELSE SELECTED MED STATEMENT>>>>>>');
      //Set the repIdx in the store to 0 since there is only one rep in the array
      store.setState({
        desired_info: {
          ...store.getState().desired_info,
          repIdx: 0,
          }
        })
      Actions.RepDetail()
      }
    }

    async onPressScheduleButton(){
      //Get the reps from the reps route
      let repsList = []
      repsList = await getRepsMed()
      //Set the store state with the conditions. This should cause local state to update and re-render
      store.setState({
        reps: repsList,
      })
      //Check if there is more than one rep for the med. If so, render the list view. If not, go straight to the RepDetail componenet
      this.checkReps()
    }

  // * *********************************** * //
  render() {

    return (
      <StyleProvider style={getTheme(platform)}>
      <Container>
        <Header>
          <Left>
            <Button
              onPress={() => { this.onPressBackButton() }}
              transparent
            >
              <Icon name="arrow-back" style={{ color: "rgb(84, 157, 191)" }}/>
            </Button>
          </Left>
          <Body>
            <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>{this.state.desired_info.brand_name}</Text>
            <Text style={{fontSize: 8, textAlign: 'center'}}>({this.state.desired_info.generic_name})</Text>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <Image style={styles.image} source={require('../../medicalStaff.png')} />
          <Text style={styles.repsy}>REPSY</Text>
          <Text style={styles.h1}>  Clinical Data </Text>

          <View style={styles.view}>
            <Button
              onPress={() => this.onpressDosing() }
              transparent
            >
              <Icon name="arrow-dropright" />
              <Text style={styles.dataButtonText}> Dosing </Text>
            </Button>
            <Button
              onPress={() => this.onpressTrialDesign() }
              transparent
            >
              <Icon name="arrow-dropright" />
              <Text style={styles.dataButtonText}>Trial Design</Text>
            </Button>
            <Button
              onPress={() => this.onpressEfficacy() }
              transparent
            >
              <Icon name="arrow-dropright" />
              <Text style={styles.dataButtonText}>Efficacy</Text>
            </Button>
            <Button
              onPress={() => this.onpressMechanismOfAction() }
              transparent
            >
              <Icon name="arrow-dropright" />
              <Text style={styles.dataButtonText}>Mechanism of Action</Text>
            </Button>
            <Button
              onPress={() => this.onpressPatientTypes() }
              transparent
            >
              <Icon name="arrow-dropright" />
              <Text style={styles.dataButtonText}>Patient Types</Text>
            </Button>
            <Button
              onPress={() => this.onpressSafety() }
              transparent
            >
              <Icon name="arrow-dropright" />
              <Text style={styles.dataButtonText}>Safety</Text>
            </Button>
          </View>

          <Text style={styles.h1}>Other Resources</Text>


          <Text> Coverage </Text>

          <Text> Patient Resources </Text>

          <Text onPress={() => this.onPressScheduleButton() }>  Sales Representative </Text>

          <Text> Speaker Programs </Text>
        </Content>
        <Footer>
          <FooterMenu />
        </Footer>
      </Container>
    </StyleProvider>
    ) // End of return
  } // End of render

} // End of component

// Variables to changes the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

// Put styles in here to format the page
const styles = StyleSheet.create({
  h1: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: '8%',
    marginBottom: '2%',
    alignSelf: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 2,
    letterSpacing: 1,
  },
  // view: {
  //   alignSelf: 'center'
  // },
  dataButtonText: {
    fontFamily: 'Hoefler Text',
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  image: {
    alignSelf: 'center',
    // width: '25%',
    // height: '10%',
    width: 60,
    height: 70,
    marginTop: '8%'
  },
  repsy: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 10,
    color: 'rgb(96, 29, 16)',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 2,
    // marginTop: '5%'
  },
});
