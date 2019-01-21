import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body } from 'native-base'

export default class Homepage extends Component {

  render() {

    return (
      <Container>
        <Header>
          <Left>
          </Left>
          <Body>
            <Text>Homepage</Text>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <Text style={{fontSize:30, textAlign:'center'}}>Welcome to Repsy!</Text>
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