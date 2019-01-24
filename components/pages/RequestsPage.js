import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body } from 'native-base'
import { WebView } from 'react-native-webview'

import store, { URI } from '../../store'


export default class RequestsPage extends Component {

  constructor(props) {
  super(props);
  this.state = {
  }
}

  render() {
    var htmlContent = `
    <div id="bookingjs"></div>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" defer></script >
        <script src="https://cdn.timekit.io/booking-js/v2/booking.min.js" defer></script>
        <script>
          window.timekitBookingConfig = {
            app_key: 'test_widget_key_gCUAuN91ij3fXpZJsJOeoAxZZ5Wgsklh',
            project_id: '077f4cb9-445c-47f9-b87a-8564d4720f68'
          }
      </script>
    `
    return (
      <Container>
        <Header>
          <Left>
            <Button
              onPress={() => {Actions.Homepage()}}>
              <Text>Home Page</Text>
            </Button>
          </Left>
          <Body>
            <Text>Requests</Text>
          </Body>
          <Right>
          </Right>
        </Header>
          <WebView source={{html: htmlContent}} />
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
