import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Left, Button, Body, Right, Footer, Content, Form, Item, Input } from 'native-base'
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase'

export default class Loginpage extends Component {

  render() {

    return (
      <Container>
        <Header>
          <Left>
            <Button
              onPress={() => {Actions.Homepage()}}>
              <Text>Homepage</Text>
            </Button>
          </Left>
          <Body>
            <Text>Loginpage</Text>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <Form>
            <Item>
              <Input placeholder="Username" />
            </Item>
            <Item last>
              <Input placeholder="Password" />
            </Item>
            <Button>
              <Text>Sign In</Text>
            </Button>
          </Form>
        </Content>
        <Footer>
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
