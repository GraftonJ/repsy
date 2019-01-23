import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body, Icon } from 'native-base'
import { WebView } from "react-native-webview";

export default class ClinicalData extends Component {
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
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Kadcyla</Text>
            <Text style={{fontSize: 8}}>(Ado-trastuzumab emtansine)</Text>
            <Text style={{fontSize: 12, fontWeight: 'bold'}}> Dosing </Text>
          </Body>
          <Right>
          </Right>
        </Header>
        <WebView
          source={{ uri: "https://www.kadcyla.com/hcp/dosing-administration.html" }}
          style={{ marginTop: 20 }}
          onLoadProgress={e => console.log(e.nativeEvent.progress)}
        />
      </Container>
    );
  }
}
