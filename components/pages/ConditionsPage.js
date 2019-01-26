// React Native and Native modules for page
import React, { Component } from 'react';
import {Platform, StyleSheet, Image, View, Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body, Icon, Text, ListItem, List, Picker, Form } from 'native-base'
import { WebView } from 'react-native-webview';

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
  onPressButton = (genericName, brandName) => {
    console.log('onPressButton()');
    store.setState({
      desired_info: {
        condition_name: store.getState().desired_info.condition_name,
        generic_name: genericName,
        brand_name: brandName,
        label: '',
        linkkey: ''
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
      <Container>
        <Header>
          <Left>
            <Button
              onPress={() => { Actions.pop() }}
              transparent
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text style={{fontSize: 17, fontWeight: 'bold', textAlign: 'center'}}>{this.state.desired_info.condition_name}</Text>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>

          <Text style={{ fontSize: 24, fontWeight: "bold", paddingTop: 20 }}>  Treatments </Text>
          <List>
            {this.state.meds.map((med, idx) => (
              <ListItem key={idx}>
                <TouchableOpacity onPress={() => this.onPressButton(med.generic_name, med.brand_name)}>
                  <Text>{`   ${med.brand_name} (${med.generic_name})`}</Text>
                </TouchableOpacity>
              </ListItem>
            ))}
          </List>
          <Text style={{ fontSize: 24, fontWeight: "bold", paddingTop: 20 }}>  Clinical Guidelines </Text>

        </Content>
        <Footer>
          <FooterMenu />
        </Footer>
      </Container>
    )
  }
}

// Variables to changes the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

// Put styles in here to format the page
const styles = StyleSheet.create({

});
