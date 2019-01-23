import React, { Component } from 'react';
import {Platform, StyleSheet, Image, View, Dimensions, AsyncStorage, FlatList} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body } from 'native-base'

export default class ConditionsPage extends Component {

  render() {
    return (
      <Container>
        <Header>
          <Left>
          </Left>
          <Body>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
        </Content>
        <Footer>
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
