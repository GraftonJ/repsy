import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';
import store, { URI } from '../../store'
import { getRepsMed } from '../../utils/api'

import getTheme from '../../native-base-theme/components'
import material from '../../native-base-theme/variables/material'
import platform from '../../native-base-theme/variables/platform'

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
  StyleProvider
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

onPressView(){
  Action.RepDetail()
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
  const { isLoading, reps } = this.state
  //Show loading spinner if fetching data
  return (
    <StyleProvider style={getTheme(platform)}>
    <Container>
      <Header>
        <Left>
          <Button
            onPress={() => { Actions.pop() }}
            transparent
          >
            <Icon name="arrow-back" style={{ color: "rgb(84, 157, 191)" }}/>
          </Button>
        </Left>
        <Body>
        </Body>
        <Right>
          <Text style={styles.repsyHeader}>REPSY</Text>
        </Right>
      </Header>
      <Content style={styles.content}>
        <Text style={styles.reps}>Representatives</Text>
        { //Check if state is loading to show spinner
          (isLoading)
          ? <Spinner style={styles.spinner} color='red'/>
          : reps.map((rep, idx) => (
            <RepsCard
            index={idx}
            key={idx}
            reps={reps}
            id={reps.id}
            style={styles.card}
            />
          ))
        }
      </Content>
      <Footer>
        <FooterMenu/>
      </Footer>
    </Container>
  </StyleProvider>
    ) // End of return

  } // End of render
}

// Variables to changes the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

// Put styles in here to format the page
const styles = StyleSheet.create({
    spinner: {
      height: height *.8,
    },
    repsyHeader: {
      fontFamily: 'Helvetica-Bold',
      fontSize: 20,
      color: 'rgb(96, 29, 16)'
    },
    card: {
      marginTop: '5%',
      padding: '5%',
    },
    reps: {
      fontSize: 30,
      fontWeight: "bold",
      marginTop: '10%',
      marginBottom: '7%',
      alignSelf: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 2,
      letterSpacing: 1,
    },
});
