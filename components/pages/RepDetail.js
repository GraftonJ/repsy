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
    desired_info: store.getState().desired_info,
    isLoading: true,
  }
}

//Subscribe reps state to the store to update on change
async componentDidMount(){
  this.unsubscribe = store.onChange(() => {
    this.setState({
      reps: store.getState().reps,
      desired_info: store.getState().desired_info
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
    const { reps, desired_info } = this.state
    if(this.state.isLoading) {
      return (
        <Spinner color='red' style={styles.spinner}/>
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
                {reps[desired_info.repIdx].brand_name}
              </Text>
              <Text style={{fontSize: 12, textAlign: 'center'}}>({reps[desired_info.repIdx].generic_name})</Text>
            </Body>
            <Right>
            </Right>
          </Header>
          <Content>
            <Image
              style={{width: '100%', height: 300}}
              source={{uri: `${reps[desired_info.repIdx].reps_photo}`}}
            />
            <Text style={styles.repName}>
              {reps[desired_info.repIdx].fname} {reps[desired_info.repIdx].lname}
            </Text>
            <Text style={styles.companyName}>
              Representative for {reps[desired_info.repIdx].company}
            </Text>
            <Text style={styles.pharma}>
              Expertise including {reps[desired_info.repIdx].brand_name} ({reps[desired_info.repIdx].generic_name})
            </Text>
            <Text style={styles.credentials}>
              Summary
            </Text>
            <Text style={styles.credentialsContent}>
              {reps[desired_info.repIdx].credentials}
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
      textAlign: 'center'
    },
    companyName: {
      marginLeft: 15,
      textAlign: 'center'
    },
    pharma: {
      marginLeft: 15,
      textAlign: 'center'
    },
    credentials: {
      marginLeft: 10,
      marginTop: 10,
      fontSize: 30,
      textAlign: 'center'
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
    },
    spinner: {
      height: height
    }

});
