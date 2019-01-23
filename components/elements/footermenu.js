
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { FooterTab, Button, Icon, Text } from 'native-base'

export default class Footermenu extends Component {

  render() {
    return (
      <FooterTab>
        <Button
          onPress={() => { Actions.ConditionsLibrary() }}
          vertical
        >
          <Icon name="clipboard" />
          <Text style={{fontSize: 11}} >Conditions</Text>
        </Button>
        <Button
          onPress={() => { Actions.Homepage() }}
          vertical
        >
          <Icon name="medkit" />
          <Text style={{fontSize: 11}} >Treatments</Text>
        </Button>
        <Button
          onPress={() => { Actions.ConditionsLibrary() }}
          vertical
        >
          <Icon active name="text" />
          <Text style={{fontSize: 9.5}} >What's New?</Text>
        </Button>
        <Button
          onPress={() => { Actions.MedicationsPage() }}
          vertical
        >
          <Icon name="send" />
          <Text style={{fontSize: 11}} >Requests</Text>
        </Button>
      </FooterTab>
    )
  }
}
