import React, { Component } from 'react';
import {Platform, StyleSheet, Image, View, Dimensions, AsyncStorage, FlatList} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body, Text, Picker, Form, Icon } from 'native-base'
import ModalDropdown from 'react-native-modal-dropdown';

import FooterMenu from '../elements/FooterMenu'

const drugLinksData = [
  {
  cancer: 'Breast Cancer',
  generic_name: 'Ado-trastuzumab emtansine',
  brand_name: 'Kadcyla',
  dosing: 'https://www.kadcyla.com/hcp/dosing-administration.html',
  trial_design: 'https://www.kadcyla.com/hcp/trial-design.html',
  efficacy: 'https://www.kadcyla.com/hcp/efficacy.html',
  mechanism_of_action: 'https://www.kadcyla.com/hcp/about-kadcyla/proposed-moa.html',
  patient_types: 'https://www.kadcyla.com/hcp/about-kadcyla/patient-eligibility.html',
  safety: 'https://www.kadcyla.com/hcp/safety-profile.html',
  coverage: 'https://www.kadcyla.com/hcp/resources/financial-assistance.html'
  },
  {
  cancer: 'Lung Cancer',
  generic_name: 'Nivolumab',
  brand_name: 'Optivo',
  dosing: 'http://www.opdivohcp.com/metastatic-nsclc/dosing/dosing-administration',
  trial_design: 'http://www.opdivohcp.com/metastatic-nsclc/efficacy/study-design',
  efficacy: 'http://www.opdivohcp.com/metastatic-nsclc/efficacy/clinical-trial-results',
  mechanism_of_action: 'http://www.opdivohcp.com/metastatic-nsclc/how-opdivo-works/mechanism-of-action',
  patient_types: 'N/A',
  safety: 'http://www.opdivohcp.com/metastatic-nsclc/selected-safety-profile/adverse-reactions',
  coverage: 'http://www.opdivohcp.com/metastatic-nsclc/access-financial-resources'
  },
  {
  cancer: 'Prostate Cancer',
  generic_name: 'Enzalutamide',
  brand_name: 'Xtandi',
  dosing: 'https://www.xtandihcp.com/dosing-administration',
  trial_design: 'https://www.xtandihcp.com/mcrpc-results/efficacy-trial-designs',
  efficacy: 'https://www.xtandihcp.com/mcrpc-results/primary-endpoints-prevail-trial',
  mechanism_of_action: 'https://www.xtandihcp.com/about-mcrpc/mechanism-of-action',
  patient_types: 'https://www.xtandihcp.com/about-mcrpc/patient-profiles/walter',
  safety: 'https://www.xtandihcp.com/safety-profile',
  coverage: 'https://www.xtandihcp.com/support-solutions'
  }
]

export default class SelectedMedication extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      current_cancer: "Breast Cancer",
      meds: []
    };
  }

  onValueChange(value: string) {
    this.setState({
      selected: value,
      meds: this.state.meds
    });
  }

  async componentDidMount(){
    const response = await fetch(`${URI}/meds`)
    const json = await getMeds()
    console.log(json)
    this.setState({meds: json})
    console.log(json[0])
  }

  render() {

    return (
      <Container>
        <Header>
          <Left>
            <Button
              onPress={() => { Actions.ConditionsLibrary() }}
              transparent
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Kadcyla</Text>
            <Text style={{fontSize: 8}}>(Ado-trastuzumab emtansine)</Text>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <Text style={{ fontSize: 24, fontWeight: "bold", paddingTop: 20 }}>  Clinical Data </Text>

          <View style={{padding: 20}}>
            <Button
              onPress={() => { Actions.ClinicalData() }}
              transparent
            >
              <Icon name="arrow-dropright" /><Text>Dosing</Text>
            </Button>
            <Button
              onPress={() => { Actions.ClinicalData() }}
              transparent
            >
              <Icon name="arrow-dropright" /><Text>Efficacy</Text>
            </Button>
            <Button
              onPress={() => { Actions.ClinicalData() }}
              transparent
            >
              <Icon name="arrow-dropright" /><Text>Mechism of Action</Text>
            </Button>
            <Button
              onPress={() => { Actions.ClinicalData() }}
              transparent
            >
              <Icon name="arrow-dropright" /><Text>Patient Types</Text>
            </Button>
            <Button
              onPress={() => { Actions.ClinicalData() }}
              transparent
            >
              <Icon name="arrow-dropright" /><Text>Safety</Text>
            </Button>
          </View>

          <View style={{padding: 20}}>
            <ModalDropdown options={['Dosing', 'Efficacy', 'Mechanism of Action', 'Patient Types', 'Safety']}/>
          </View>

          <Text style={{ fontSize: 24, fontWeight: "bold", paddingTop: 20 }}>  Coverage </Text>

          <Text style={{ fontSize: 24, fontWeight: "bold", paddingTop: 20 }}>  Patient Resources </Text>

          <Text style={{ fontSize: 24, fontWeight: "bold", paddingTop: 20 }}>  Sales Representative </Text>

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
