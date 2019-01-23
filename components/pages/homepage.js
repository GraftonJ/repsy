import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import store, { URI } from '../../store'
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

import FooterMenu from '../elements/FooterMenu'

export default class Homepage extends Component {
  constructor(props) {
  super(props);
  this.state = {
    doctorsConditions: ['First Condition', 'Second Condition', 'Third Condition'],
  }
}

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
          <Text style={styles.title}>Selected Conditions</Text>
          {this.state.doctorsConditions.map((condition, idx) => (
            <Button key={idx} rounded style={styles.button}>
              <Text>{condition}</Text>
            </Button>
          ))}
        </Content>
        <Footer>
          <FooterMenu/>
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
    button: {
      margin: 15,
      width: '80%',
    },
    title: {
      fontSize: 40,
      margin: 10,
    }
});
