import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions, Alert, Image, DatePickerIOS} from 'react-native';
import { Actions } from 'react-native-router-flux';
import store, { URI } from '../../store'
import { getRepsMed, getBookings } from '../../utils/api'
import timekit from 'timekit-sdk'
import moment from 'moment'
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
  StyleProvider,
  Form,
  Item,
  Input,
  Label,
  Textarea,
} from 'native-base'

import getTheme from '../../native-base-theme/components'
import material from '../../native-base-theme/variables/material'
import platform from '../../native-base-theme/variables/platform'

import FooterMenu from '../elements/FooterMenu'

export default class RepDetail extends Component {
  constructor(props) {
  super(props);
  this.state = {
    reps: store.getState().reps,
    desired_info: store.getState().desired_info,
    isLoading: true,
    chosenDate: new Date(),
    isLookingForAppointment: false,
    bookingRequest: {
      resource_id: 'e4b663d4-8ea8-44ab-8685-dfbf5cf4b699',
      graph: 'confirm_decline',
      start: '',
      end: '',
      what: 'NEW BOOKING',
      where: 'Courthouse, Hill Valley, CA 95420, USA',
      description: 'New booking TEST',
      customer: {
        name: 'Jimbo Martins',
        email: 'tarmstrong1327@gmail.com',
        phone: '(916) 555-4385',
        voip: 'McFly',
        timezone: 'America/Los_Angeles'
      }
    }
  }
  this.setDate = this.setDate.bind(this)
}
  // Request New Appointment 
  requestAppointment = () => {
    this.setState({
      isLookingForAppointment: true,
    })
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
  store.setState()
  //disconnect from store notifications
  this.unsubscribe()
}

//******************************/

  render() {
    const { reps, desired_info, chosenDate } = this.state
    if(this.state.isLoading) {
      return (
        <Spinner color='red' style={styles.spinner}/>
      )
    }
    
    else {
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
              <Text style={{fontSize: 17, fontWeight: 'bold', textAlign: 'center'}}>
                {reps[desired_info.repIdx].brand_name}
              </Text>
              <Text style={{fontSize: 12, textAlign: 'center'}}>({reps[desired_info.repIdx].generic_name})</Text>
            </Body>
            <Right>
            </Right>
          </Header>
            {(this.state.isLookingForAppointment)
              ? <Content>
                <Form style={styles.container}>
                  <Item picker style={styles.item}>
                    <View style={styles.container}>
                      <Label style={styles.heading}>Pharma Rep: {reps[desired_info.repIdx].fname}</Label>
                    </View>
                  </Item>
                  <Item style={styles.item}>
                    <Icon active name='ios-call' />
                    <Input placeholder='Contact Number' />
                  </Item>
                  <Item stackedLabel style={styles.item}>
                    <View style={styles.container}>
                      <Label style={styles.heading}>Reason For Appointment</Label>
                    </View>
                    <Textarea rowSpan={5} width={340} bordered onChange={this.setReason} />
                  </Item>
                  <Item style={styles.item}>
                    <View style={styles.container}>
                      <Label style={styles.heading}>Appointment Time/Date (MST)</Label>
                      <DatePickerIOS
                        date={chosenDate}
                        onDateChange={this.setDate}
                        minuteInterval={15}
                      />
                    </View>
                  </Item>
                </Form>
              </Content> 
              : <Content>
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
                  <Button style={styles.scheduleButton} onPress={() => this.requestAppointment()}
                      title='Schedule Appointment'>
                      <Text> Schedule Appointment </Text>
                    </Button>
                  </View>
                </Content>}
          <Footer>
            {(this.state.isLookingForAppointment)
              ? <Button onPress={() => this.createNewBookingRequest()} title="Submit New Request"><Text>Submit New Request</Text></Button>
              : <FooterMenu />}
          </Footer>
        </Container>
      </StyleProvider>
        ) // End of return
      }
    } // End of render

  // Set Current Date to State from Request Booking Form
  setDate(newDate) {
    console.log('this.state', this.state)
    this.setState({
      chosenDate: newDate,
      bookingRequest: {
        ...this.state.bookingRequest,
        start: moment(newDate).format(),
        end: moment(newDate).add(1, 'hour').format()
      }
    })
  }

  // Create a new Booking Request to desired Resource
  createNewBookingRequest = async () => {
    try {
      timekit.createBooking(
        this.state.bookingRequest
      ).then(function (response) {
        console.log("WORKED +++> ", response);
      }).catch(function (response) {
        console.log("DIED +++> ", response);
      })
    } catch (error) {
      console.log(error)
    }

    this.viewAppointments()
  }

  // View Calendar onClick function with updated Booking Requests
  viewAppointments = () => {
    this.setState({
      isLookingForAppointment: false,
    })
    getBookings()
  }

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
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center'
    },
    heading: {
      color: 'rgb(96, 29, 16)',
      fontFamily: 'Helvetica',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    item: {
      marginTop: 20
    }
});
