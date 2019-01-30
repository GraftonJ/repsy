// React Native and Native modules for page
import React, { Component } from 'react';
import {Platform, StyleSheet, Image, View, Dimensions, AsyncStorage, FlatList} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body, Text, Picker, Form, Icon } from 'native-base'
import ModalDropdown from 'react-native-modal-dropdown';

// Accesses the store and api
import { getMeds } from '../../utils/api'
import store, { URI } from '../../store'

// Imports the footer navbar at the bottom
import FooterMenu from '../elements/FooterMenu'

export default class SelectedMedication extends Component {

  // * *********************************** * //
  constructor(props) {
    super(props);
    this.state = {
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
        condition_name: store.getState().desired_info.condition_name,
        generic_name: store.getState().desired_info.generic_name,
        brand_name: store.getState().desired_info.brand_name,
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
        condition_name: store.getState().desired_info.condition_name,
        generic_name: store.getState().desired_info.generic_name,
        brand_name: store.getState().desired_info.brand_name,
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
        condition_name: store.getState().desired_info.condition_name,
        generic_name: store.getState().desired_info.generic_name,
        brand_name: store.getState().desired_info.brand_name,
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
        condition_name: store.getState().desired_info.condition_name,
        generic_name: store.getState().desired_info.generic_name,
        brand_name: store.getState().desired_info.brand_name,
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
        condition_name: store.getState().desired_info.condition_name,
        generic_name: store.getState().desired_info.generic_name,
        brand_name: store.getState().desired_info.brand_name,
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
          condition_name: store.getState().desired_info.condition_name,
          generic_name: store.getState().desired_info.generic_name,
          brand_name: store.getState().desired_info.brand_name,
          label: store.getState().desired_info.label,
          linkkey: store.getState().desired_info.linkkey
        }
      });
      Actions.pop()
    }

    onPressScheduleButton = () => {
      Actions.RepDetail()
    }

  // * *********************************** * //
  render() {

    return (
      <Container>
        <Header>
          <Left>
            <Button
              onPress={() => { this.onPressBackButton() }}
              transparent
            >
              <Icon name="arrow-back" />
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
          <Text style={{ fontSize: 24, fontWeight: "bold", paddingTop: 20 }}>  Clinical Data </Text>

          <View style={{padding: 2}}>
            <Button
              onPress={() => this.onpressDosing() }
              transparent
            >
              <Icon name="arrow-dropright" /><Text>Dosing</Text>
            </Button>
            <Button
              onPress={() => this.onpressTrialDesign() }
              transparent
            >
              <Icon name="arrow-dropright" /><Text>Trial Design</Text>
            </Button>
            <Button
              onPress={() => this.onpressEfficacy() }
              transparent
            >
              <Icon name="arrow-dropright" /><Text>Efficacy</Text>
            </Button>
            <Button
              onPress={() => this.onpressMechanismOfAction() }
              transparent
            >
              <Icon name="arrow-dropright" /><Text>Mechism of Action</Text>
            </Button>
            <Button
              onPress={() => this.onpressPatientTypes() }
              transparent
            >
              <Icon name="arrow-dropright" /><Text>Patient Types</Text>
            </Button>
            <Button
              onPress={() => this.onpressSafety() }
              transparent
            >
              <Icon name="arrow-dropright" /><Text>Safety</Text>
            </Button>
          </View>

          <Text style={{ fontSize: 24, fontWeight: "bold", paddingTop: 20 }}>  Coverage </Text>

          <Text style={{ fontSize: 24, fontWeight: "bold", paddingTop: 20 }}>  Patient Resources </Text>

          <Text style={{ fontSize: 24, fontWeight: "bold", paddingTop: 20 }} onPress={() => this.onPressScheduleButton() }>  Sales Representative </Text>

          <Text style={{ fontSize: 24, fontWeight: "bold", paddingTop: 20 }}>  Speaker Programs </Text>
        </Content>
        <Footer>
          <FooterMenu />
        </Footer>
      </Container>
    ) // End of return
  } // End of render

} // End of component

// Variables to changes the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

// Put styles in here to format the page
const styles = StyleSheet.create({

});
