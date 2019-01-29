
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { FooterTab, Button, Icon, Text } from 'native-base'

export default class FooterMenu extends Component {

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
          onPress={() => { Actions.MedsLibrary() }}
          vertical
        >
          <Icon name="medkit" />
          <Text style={{fontSize: 11}} >Treatments</Text>
        </Button>
        <Button
          onPress={() => { Actions.Homepage() }}
          vertical
        >
          <Icon active name="home" />
          <Text style={{fontSize: 11}} >Home</Text>
        </Button>
        <Button
          onPress={() => { Actions.RequestsPage() }}
          vertical
        >
          <Icon name="send" />
          <Text style={{fontSize: 11}} >Requests</Text>
        </Button>
      </FooterTab>
    )
  }
}
