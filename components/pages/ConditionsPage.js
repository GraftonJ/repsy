// React Native and Native modules for page
import React, { Component } from 'react';
import {Platform, StyleSheet, Image, View, Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body, Icon, Text, ListItem, List, Picker, Form, StyleProvider } from 'native-base'
import { WebView } from 'react-native-webview';

import getTheme from '../../native-base-theme/components'
import material from '../../native-base-theme/variables/material'
import platform from '../../native-base-theme/variables/platform'

// Accesses the store and api
import store, { URI } from '../../store'
import { getMeds } from '../../utils/api'

// Imports the footer navbar at the bottom
import FooterMenu from '../elements/FooterMenu'

export default class ConditionsPage extends Component {

  // * *********************************** * //
  constructor(props) {
    super(props);
    this.state = {
      desired_info: store.getState().desired_info,
      current_cancer: "Breast Cancer",
      meds: []
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
  // Function that handels a button press of one of the drugs.  Passes that to the
  // desired_info object in the store.  Needs to keep condition name, so that is passed
  onPressButton = (genericName, brandName, medId, pharma_company) => {
    console.log('onPressButton()');
    store.setState({
      desired_info: {
        ...store.getState().desired_info,
        generic_name: genericName,
        brand_name: brandName,
        med_id: medId,
        pharma_company: pharma_company,
      }
    });
    Actions.SelectedMedication()
  }

  // * *********************************** * //
  componentWillUnmount(){
    //disconnect from store notifications
    this.unsubscribe()
  }

  // * *********************************** * //
  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
      <Container>
        <Header>
          <Left>
            <Button
              onPress={() => { Actions.pop() }}
              transparent
            >
              <Icon name="arrow-back" style={{ color: "rgb(84, 157, 191)" }}/>
            </Button>
          </Left>
          <Body>
            <Text style={{fontSize: 17, fontWeight: 'bold' }}>{this.state.desired_info.condition_name}</Text>
          </Body>
          <Right>
            <Text style={styles.repsyHeader}>REPSY</Text>
          </Right>
        </Header>
        <Content>
          <Image style={styles.image} source={require('../../medicalStaff.png')} />

          <Text style={styles.treatmentsText}>  Treatments </Text>
            {this.state.meds.map((med, idx) => (
              <View
                style={styles.view}
                key={idx}>
                <Button
                  rounded style={styles.button}
                  style={styles.button}
                  onPress={() => this.onPressButton(med.generic_name, med.brand_name, med.id, med.pharma_company)}>
                  <Text>{`   ${med.brand_name} (${med.generic_name})`}</Text>
                </Button>
              </View>
            ))}
          <Text style={styles.guidelinesText}>  Clinical Guidelines </Text>

        </Content>
        <Footer>
          <FooterMenu />
        </Footer>
      </Container>
    </StyleProvider>
    )
  }
}

// Variables to changes the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

// Put styles in here to format the page
const styles = StyleSheet.create({
  repsyHeader: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 20,
    color: 'rgb(96, 29, 16)'
  },
  treatmentsText: {
    fontSize: 30,
    fontWeight: "bold",
    // marginTop: '10%',
    alignSelf: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 2,
    letterSpacing: 1,
  },
  guidelinesText: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: 'center',
    marginTop: '5%',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 2,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    margin: 3,
    width: '80%',
    alignSelf: 'center',
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  image: {
    alignSelf: 'center',
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
  },

});
