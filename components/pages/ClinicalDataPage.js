// React Native and Native modules for page
import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body, Icon, Spinner } from 'native-base'

// Imports a new component to render web pages in an app
import { WebView } from "react-native-webview";

// Accesses the store
import store, { URI } from '../../store'

// Data for this componenet to put in the right link
const drugLinksData = {
  'Kadcyla': {
  dosing: 'https://www.kadcyla.com/hcp/dosing-administration.html',
  trial_design: 'https://www.kadcyla.com/hcp/trial-design.html',
  efficacy: 'https://www.kadcyla.com/hcp/efficacy.html',
  mechanism_of_action: 'https://www.kadcyla.com/hcp/about-kadcyla/proposed-moa.html',
  patient_types: 'https://www.kadcyla.com/hcp/about-kadcyla/patient-eligibility.html',
  safety: 'https://www.kadcyla.com/hcp/safety-profile.html',
  coverage: 'https://www.kadcyla.com/hcp/resources/financial-assistance.html'
  },
  'Opdivo': {
  dosing: 'http://www.opdivohcp.com/metastatic-nsclc/dosing/dosing-administration',
  trial_design: 'http://www.opdivohcp.com/metastatic-nsclc/efficacy/study-design',
  efficacy: 'http://www.opdivohcp.com/metastatic-nsclc/efficacy/clinical-trial-results',
  mechanism_of_action: 'http://www.opdivohcp.com/metastatic-nsclc/how-opdivo-works/mechanism-of-action',
  patient_types: 'N/A',
  safety: 'http://www.opdivohcp.com/metastatic-nsclc/selected-safety-profile/adverse-reactions',
  coverage: 'http://www.opdivohcp.com/metastatic-nsclc/access-financial-resources'
  },
  'Xtandi': {
  dosing: 'https://www.xtandihcp.com/dosing-administration',
  trial_design: 'https://www.xtandihcp.com/mcrpc-results/efficacy-trial-designs',
  efficacy: 'https://www.xtandihcp.com/mcrpc-results/primary-endpoints-prevail-trial',
  mechanism_of_action: 'https://www.xtandihcp.com/about-mcrpc/mechanism-of-action',
  patient_types: 'https://www.xtandihcp.com/about-mcrpc/patient-profiles/walter',
  safety: 'https://www.xtandihcp.com/safety-profile',
  coverage: 'https://www.xtandihcp.com/support-solutions'
  }
}

export default class ClinicalData extends Component {

  // * *********************************** * //
  constructor(props) {
    super(props);
    this.state = {
      desired_info: store.getState().desired_info,
      isLoading: true,
    };
  }

  // * *********************************** * //
  //Subscribe doctorsConditions state to the store to update on change
  async componentDidMount(){
    this.unsubscribe = store.onChange(() => {
      this.setState({
        desired_info: store.getState().desired_info
      })
    })
    this.setState({
      isLoading: false,
    })
  }

  // * *********************************** * //
  componentWillUnmount(){
    //disconnect from store notifications
    this.unsubscribe()
  }

  // * *********************************** * //
  render() {

    //Show loading spinner if fetching data
    if(this.state.isLoading){
        return (
          <Spinner style={styles.spinner} color='red' />
        )
      }
    else {
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
            <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>{this.state.desired_info.brand_name}</Text>
            <Text style={{fontSize: 8, textAlign: 'center'}}>({this.state.desired_info.generic_name})</Text>
            <Text style={{fontSize: 12, fontWeight: 'bold', textAlign: 'center'}}> {this.state.desired_info.label} </Text>
          </Body>
          <Right>
          </Right>
        </Header>
        <WebView
          source={{ uri: `${drugLinksData[this.state.desired_info.brand_name][this.state.desired_info.linkkey]}` }}
          style={{ marginTop: 20 }}
          onLoadProgress={e => console.log(e.nativeEvent.progress)}
        />
      </Container>
    );
  }
}
}

// Variables to changes the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

// Put styles in here to format the page
const styles = StyleSheet.create({
    spinner: {
      height: height
    }
});
