import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body, Icon } from 'native-base'
import { WebView } from "react-native-webview";

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

export default class ClinicalData extends Component {
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
            <Text style={{fontSize: 12, fontWeight: 'bold'}}> Dosing </Text>
          </Body>
          <Right>
          </Right>
        </Header>
        <WebView
          source={{ uri: `${drugLinksData[0].dosing}` }}
          style={{ marginTop: 20 }}
          onLoadProgress={e => console.log(e.nativeEvent.progress)}
        />
      </Container>
    );
  }
}
