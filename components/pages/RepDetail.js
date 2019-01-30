import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions, Alert, Image} from 'react-native';
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

export default class RepDetail extends Component {
  constructor(props) {
  super(props);
  this.state = {
    reps: store.getState().reps,
    isLoading: true,
  }
}

//Subscribe reps state to the store to update on change
async componentDidMount(){
  this.unsubscribe = store.onChange(() => {
    this.setState({
      reps: store.getState().reps
    })
  })
//Get the reps from the reps route
  let repsList = []
  repsList = await getRepsMed()
  console.log('RepsList>>>>>>', repsList)
//Set the store state with the reps. This should cause local state to update and re-render
  store.setState({
    reps: repsList,
  })
  this.setState({
    isLoading: false,
  })
}
// * *********************************** * //
componentWillUnmount(){
  //disconnect from store notifications
  this.unsubscribe()
}

//******************************/

  render() {
    const { reps } = this.state
    if(this.state.isLoading) {
      return (
        <Spinner color='red' />
      )
    }
    else {
      return (
        <Container>
          <Header>
            <Left>
              <Button
                onPress={() => { Actions.pop() }}
                transparent
              >
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Text style={{fontSize: 17, fontWeight: 'bold', textAlign: 'center'}}>
                {reps[0].brand_name}
              </Text>
              <Text style={{fontSize: 12, textAlign: 'center'}}>({reps[0].generic_name})</Text>
            </Body>
            <Right>
            </Right>
          </Header>
          <Content>
            <Image
              style={{width: '100%', height: 300}}
              source={{uri: `${reps[0].reps_photo}`}}
            />
            <Text style={styles.repName}>
              {reps[0].fname} {reps[0].lname}
            </Text>
            <Text style={styles.companyName}>
              Representative for {reps[0].company}
            </Text>
            <Text style={styles.pharma}>
              Expertise including {reps[0].brand_name} ({reps[0].generic_name})
            </Text>
            <Text style={styles.credentials}>
              Summary:
            </Text>
            <Text style={styles.credentialsContent}>
              {reps[0].credentials}
            </Text>
            <View style={styles.buttonContainer}>
              <Button style={styles.scheduleButton}
                title='Schedule Appointment'>
                <Text> Schedule Appointment </Text>
              </Button>
            </View>
          </Content>
          <Footer>
            <FooterMenu/>
          </Footer>
        </Container>
        ) // End of return
      }
    } // End of render

  } // End of componenet

// Variables to changes the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    repName: {
      fontSize: 30,
      marginLeft: 10,
    },
    companyName: {
      marginLeft: 15,
    },
    pharma: {
      marginLeft: 15,
    },
    credentials: {
      marginLeft: 10,
      marginTop: 10,
      fontSize: 30,
    },
    credentialsContent: {
      marginLeft: 15,
      marginRight: 15,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center"
    },
    scheduleButton: {
      marginTop: 10,
    }

});
