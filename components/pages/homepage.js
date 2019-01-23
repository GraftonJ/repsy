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
    doctorsConditions: store.getState().doctorsConditions,
    isLoading: true,
  }
}

//Subscribe doctorsConditions state to the store to update on change
componentDidMount(){
  this.unsubscribe = store.onChange(() => {
    this.setState({
      doctorsConditions: store.getState().doctorsConditions,
    })
  })

}
componentWillUnmount(){
  //disconnect from store notifications
  this.unsubscribe()
}
//Get the conditions from the doctors_conditions route passing in the doctor ID from the user state
//Set the store state with the conditions. This should cause local state to update a re-render

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
          <Button onPress={() => store.setState({
            doctorsConditions: ['Hacked 1', 'Hacked 2', 'Hacked 3',]
          })}><Text>PRESS</Text></Button>
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
