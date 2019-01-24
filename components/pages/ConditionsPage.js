import React, { Component } from 'react';
import {Platform, StyleSheet, Image, View, Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body, Icon, Text, ListItem, List, Picker, Form } from 'native-base'
import { WebView } from 'react-native-webview';

import store, { URI } from '../../store'
import { getMeds } from '../../utils/api'

export default class ConditionsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      current_cancer: "Breast Cancer",
      meds: [],
      selected: ''
    };
  }

  onValueChange(value: string) {
    this.setState({
      selected: value,
      meds: this.state.meds
    });
  }

  async componentDidMount(){
    const response = await fetch(`${URI}/meds`)
    const json = await getMeds()
    console.log(json)
    this.setState({meds: json})
    console.log(json[0])
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              onPress={() => { Actions.ConditionsLibrary() }}
              transparent
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>{this.state.current_cancer}</Text>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>

          <Text style={{ fontSize: 24, fontWeight: "bold", paddingTop: 20 }}>  Treatments </Text>





          <List>
            {this.state.meds.map((med, idx) => (
              <ListItem key={idx}>
                <TouchableOpacity>
                  <Text>{`   ${med.brand_name} (${med.generic_name})`}</Text>
                </TouchableOpacity>
              </ListItem>
            ))}
          </List>

            <Text style={{ fontSize: 24, fontWeight: "bold", paddingTop: 20 }}>  Clinical Guidelines </Text>

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
