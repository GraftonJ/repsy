import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Left,
  Right,
  Body
} from 'native-base'

import Footermenu from '../elements/footermenu'

export default class Homepage extends Component {

  render() {

    return (
      <Container>
        <Header>
          <Left>
            <Text>Hello Bejan</Text>
          </Left>
          <Body>
          </Body>
          <Right>
            <Button
              onPress={() => { Actions.ConditionsLibrary() }}
            >
              <Text>Conditions</Text>
            </Button>
          </Right>
        </Header>
        <Content>
        </Content>
        <Footer>
          <Footermenu/>
        </Footer>
      </Container>
    ) // End of return
  } // End of render

} // End of componenet

// Variables to changes the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

// Put styles in here to format the page
const styles = StyleSheet.create({

});
