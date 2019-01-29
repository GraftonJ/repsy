import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';
import store, { URI } from '../../store'
import { getRepsMed } from '../../utils/api'
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
  Body,
  Spinner,
} from 'native-base'
import FooterMenu from '../elements/FooterMenu'
import RepsCard from '../elements/RepsCard'

export default class RepsList extends Component {
  constructor(props) {
  super(props);
  this.state = {
    reps: store.getState().reps,
    //Local state
    error: false,
    isLoading: true,
  }
}

//Subscribe doctorsConditions state to the store to update on change
async componentDidMount(){
  this.unsubscribe = store.onChange(() => {
    this.setState({
      reps: store.getState().reps,
    })
  })
//Get the reps from the reps route
  let repsList = []
  repsList = await getRepsMed()
//Set the store state with the conditions. This should cause local state to update and re-render
  store.setState({
    reps: repsList,
  })
  this.setState({
    isLoading: false,
  })
}

componentWillUnmount(){
  //disconnect from store notifications
  this.unsubscribe()
}

render() {
  const { isLoading, reps} = this.state
  //Show loading spinner if fetching data
  return (
    <Container>
      <Header>
        <Left>
          <Text>Hello</Text>
        </Left>
        <Body>
        </Body>
        <Right>
        </Right>
      </Header>
      <Content>
        { //Check if state is loading to show spinner
          (isLoading)
          ? <Spinner color='red' />
          : reps.map((rep, idx) => (
            <RepsCard
            key={idx}
            reps={reps}
            />
          ))
        }
      </Content>
      <Footer>
        <FooterMenu/>
      </Footer>
    </Container>
    ) // End of return

  } // End of render
}
