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
              onPress={() => {Actions.Loginpage()}}>
              <Text>Login</Text>
            </Button>
          </Right>
        </Header>
        <Content>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="clipboard" />
              <Text style={{fontSize: 11}} >Conditions</Text>
            </Button>
            <Button vertical>
              <Icon name="medkit" />
              <Text style={{fontSize: 11}} >Treatments</Text>
            </Button>
            <Button vertical>
              <Icon active name="text" />
              <Text style={{fontSize: 9.5}} >What's New?</Text>
            </Button>
            <Button vertical>
              <Icon name="send" />
              <Text style={{fontSize: 11}} >Requests</Text>
            </Button>
          </FooterTab>
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
