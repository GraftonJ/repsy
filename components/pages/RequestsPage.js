import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { WebView } from 'react-native-webview'
import { Agenda } from 'react-native-calendars'
import { getBookings } from '../../utils/api'
import store, { URI } from '../../store'
import timekit from 'timekit-sdk'
import moment from 'moment'
import getTheme from '../../native-base-theme/components'
import material from '../../native-base-theme/variables/material'
import platform from '../../native-base-theme/variables/platform'
import {
  Platform,
  StyleSheet,
  View,
  Dimensions,
  DatePickerIOS
} from 'react-native'
import {
  Container,
  Button,
  Header,
  Content,
  Footer,
  Left,
  Text,
  Right,
  Body,
  Toast,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
  Textarea,
  StyleProvider
} from 'native-base'


export default class RequestsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: store.getState().user.id,
      items: store.getState().items,
      calendarBookings: store.getState().calendarBookings,
      calendarResources: store.getState().calendarResources,
      isLookingForAppointment: false,
      chosenDate: new Date(),
      bookingRequest: {
        resource_id: 'e4b663d4-8ea8-44ab-8685-dfbf5cf4b699',
        graph: 'confirm_decline',
        start: '',
        end: '',
        what: 'NEW BOOKING',
        where: 'Courthouse, Hill Valley, CA 95420, USA',
        description: 'New booking TEST',
        customer: {
          name: store.getState().user.fname,
          email: 'tarmstrong1327@gmail.com',
          phone: '(916) 555-4385',
          voip: 'McFly',
          timezone: 'America/Los_Angeles'
        }
      }
    }
    this.setDate = this.setDate.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.onChange(() => {
      this.setState({
        items: store.getState().items,
        calendarBookings: store.getState().calendarBookings,
        calendarResources: store.getState().calendarResources,
      })
    })
    //Get the conditions from the doctors_conditions route
    getBookings()

    store.setState({
      calendarBookings: store.getState().calendarBookings,
      calendarResources: store.getState().calendarResources,
    })
  }

  componentWillUnmount() {
    //disconnect from store notifications
    this.unsubscribe()
  }

  render() {
    // console.log('bookings', this.state.calendarBookings)
    const {
      calendarBookings,
      calendarResources,
      chosenDate
    } = this.state

    return (
      <StyleProvider style={getTheme(platform)}>
      <Container>
        <Header>
          <Left>
            <Icon name="arrow-back" style={{ color: "rgb(84, 157, 191)" }} onPress={() => { Actions.pop() }}/>
          </Left>
          <Body>
            <Text style={styles.headerRequests}>Requests</Text>
          </Body>
          <Right>
            {(this.state.isLookingForAppointment)
              ? <Button onPress={() => { this.viewAppointments() }}>
                  <Text>Calendar</Text>
                </Button>
              : <Text style={styles.repsyHeader}>REPSY</Text>
            }
          </Right>
        </Header>
        {
          (this.state.isLookingForAppointment)
            ?
              <Content>
                <Form>
                  <Item picker style={styles.section}>
                    <Label style={styles.heading}>Pharma Rep</Label>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      placeholder="Who do you want to Book?"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.bookingRequest.resource_id}
                      onValueChange={this.onResourceValueChange.bind(this)}
                    >
                      {calendarResources.map((x, idx) => {
                        return <Picker.Item key={idx} label={x.first_name + ' ' + x.last_name} value={x.id} id={x.id} />
                      })}
                    </Picker>
                  </Item>
                  <Item style={styles.section}>
                    <Icon active name='ios-call' />
                    <Input placeholder='Contact Number' />
                  </Item>
                  <Item stackedLabel style={styles.section}>
                    <View style={styles.container}>
                      <Label style={styles.heading}>Reason For Appointment</Label>
                    </View>
                    <Textarea rowSpan={5} width={340} bordered onChange={this.setReason.bind(this)} />
                  </Item>
                  <Item style={styles.section}>
                    <View style={styles.container}>
                      <Label style={styles.heading}>Appointment Time/Date (MST)</Label>
                      <DatePickerIOS
                        date={chosenDate}
                        onDateChange={this.setDate}
                        minuteInterval={15}
                      />
                    </View>
                    {/* {console.log('chosenDate', chosenDate)}
                    {console.log('this.state', this.state)} */}
                  </Item>
                </Form>
              </Content>
            : <Agenda
              items={calendarBookings}
              selected={new Date()}
              renderItem={this.renderItem.bind(this)}
              rowHasChanged={this.rowHasChanged.bind(this)}
              theme={{ agendaKnobColor: 'grey', dotColor: '#00adf5'}}
              renderEmptyData={this.renderEmptyData.bind(this)}
            />
        }
      <Footer>
          {
            (this.state.isLookingForAppointment)
              ? <Button
                style={{marginTop: 7}}
                onPress={() => this.createNewBookingRequest()}
                ><Text>Submit New Request</Text>
              </Button>
              : <Button
                style={{marginTop: 7}}
                onPress={() => this.requestAppointment()}
                >
                  <Text>Create New Request</Text>
                </Button>
          }
      </Footer>
      </Container>
    </StyleProvider>
    ) // End of return
  } // End of render

  //Request new Appointment function for create request button
  requestAppointment = () => {
    this.setState({
      isLookingForAppointment: true,
    })
  }

  // View Calendar onClick function with updated Booking Requests
  viewAppointments = () => {
    this.setState({
      isLookingForAppointment: false,
    })
    getBookings()
  }

  // Set Current resource_id to State from Request Booking Form
  onResourceValueChange(value: string) {
    this.setState({
      bookingRequest: {
        ...this.state.bookingRequest,
        resource_id: value
      }
    })
  }

  // Set Current Date to State from Request Booking Form
  setDate(newDate) {
    this.setState({
      chosenDate: newDate,
      bookingRequest: {
        ...this.state.bookingRequest,
        start: moment(newDate).format(),
        end: moment(newDate).add(1, 'hour').format()
      }
    })
  }

  setReason(string) {
    // console.log('string', string.target)
    this.setState({
      bookingRequest: {
        ...this.state.bookingRequest,
        what: string,
      }
    })
  }


  // Create a new Booking Request to desired Resource
  createNewBookingRequest = async () => {
    try {
      // timekit.updateBooking({
      //   id: 'd231f1b4-b1d5-4d96-ad21-823944c2fc05',
      //   action: "create",
      //   event: {
      //     calendar_id: "b7f0db96-819c-4460-bcba-4fc2d2522484",
      //     end: "2019-01-27T22:15:00-07:00",
      //     start: "2019-01-27T21:30:00-06:00",
      //     what: "NEW BOOKING",
      //     where: "Courthouse, Hill Valley, CA 95420, USA"
      //   },
      //   customer: {
      //     name: 'Jimbo Martins',
      //     email: 'tarmstrong1327@gmail.com'
      //   }
      // })
      timekit.createBooking(
        this.state.bookingRequest
      ).then((response) => {
        console.log("WORKED +++> ", response);
      }).catch((response) => {
        console.log("DIED +++> ", response);
      })
    } catch (error) {
      console.log(error)
    }
    // this.forceUpdate()
    this.viewAppointments()
  }

  // Switch Statement for Confirm|Decline|Delete event Button
  renderSwitch(item) {
    switch (item.state) {
      case 'tentative':
        return <View style={styles.view}>
          <Button
            transparent
            id='confirm'
            style={[styles.button], {marginRight: 20, marginTop: 5}}
            buttonTextStyle={{ color: "#008000" }}
            onPress={() => {
              // this will update a booking to a new status
              timekit.updateBooking({
                id: item.booking_id,
                action: "confirm" // or "decline" or "cancel"
              })

              Toast.show({
                text: "tentative appointment Confirmed!",
                buttonText: "Okay",
                buttonTextStyle: { color: "#008000" },
                buttonStyle: { backgroundColor: "#5cb85c" }
              })
              getBookings()
            }
            }
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </Button>
          <Button
            transparent
            style={{marginTop: 5}}
            onPress={() => {
              // this will update a booking to a new status
              timekit.updateBooking({
                id: item.booking_id,
                action: "decline" // or "decline" or "cancel"
              }).then((res) => {
                // console.log('hello')
              }).catch((err) => {
                console.log('error', err)
              })

              Toast.show({
                text: "tentative appointment Declined!",
                buttonText: "Okay",
                buttonTextStyle: { color: "#008000" },
                buttonStyle: { backgroundColor: "#5cb85c" }
              })
            }
            }
          >
            <Text style={styles.buttonText}>Decline</Text>
          </Button>
        </View>
        break;
      case 'confirmed':
        return <View style={styles.view}>
            <Button
              transparent
              style={{marginTop: 5}}
              onPress={() => {
                // this will update a booking to a new status
                timekit.updateBooking({
                  id: item.booking_id,
                  action: "cancel" // or "decline" or "cancel"
                })

                Toast.show({
                  text: "Appointment Canceled!",
                  buttonText: "Okay",
                  buttonTextStyle: { color: "#008000" },
                  buttonStyle: { backgroundColor: "#5cb85c" }
                })
              }}
            >
              <Text
                style={styles.buttonText}>Cancel</Text>
            </Button>
          </View>
        break;
      default:
        return <Text style={{textAlign: 'center', marginBottom: 5, marginTop: 5, color: 'rgb(84, 157, 191)'}}>Appointment Declined</Text>
    }
  }

  // Scheme for Rendering Bookings onto Agenda View
  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text style={{paddingBottom: 5, alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>Request From: {item.customer_name}</Text>
        <Text style={{paddingBottom: 5, alignSelf: 'center', color: 'rgb(84, 157, 191)'}}>Pharma Rep: Samantha</Text>
        <Text style={{marginBottom: 5, marginTop: 12, alignSelf: 'center'}}>{item.event_name}</Text>
        <Item style={{ width: 240 }}>
          <Icon active name='ios-time' />
          <Text style={{ textAlign: 'left', paddingBottom: 5 }}>{moment(item.event_start).format('MMM Do, h:mm a')} - {moment(item.event_end).format('h:mm a')}</Text>
        </Item>
        <Item style={{ width: 200 }}>
          <Icon active name='ios-navigate' />
          <Text style={{ textAlign: 'center', marginBottom: 5, marginTop: 15 }}>{item.event_location}</Text>
        </Item>
        {/* {console.log('item', item)}
        <Icon active name='ios-filing' /> */}
        <View>{this.renderSwitch(item)}</View>
      </View>
    )
  }
  // Scheme for Rendering Empty Agenda Days
  renderEmptyData(item) {
    return (
      <View style={styles.emptyDate}>
        <Text style={styles.noEvent}>No Events Today!</Text>
        <Button onPress={() => this.requestAppointment()} title="Create New Request" />
      </View>
    )
  }
  // Checks to See if Agenda has changed to refresh data
  rowHasChanged(r1, r2) {
    if(r1.name !== r2.name) {
      getBookings()
    }
  }

} // End of componenet

const styles = StyleSheet.create({
  repsyHeader: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 20,
    color: 'rgb(96, 29, 16)'
  },
  headerRequests: {
    fontSize: 18,
    letterSpacing: 1,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    borderWidth: 1,
    borderColor: 'rgb(167, 169, 170)',
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  button: {
    color: 'red',
  },
  buttonText: {
    fontSize: 16,
    letterSpacing: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  heading: {
    color: 'rgb(96, 29, 16)',
    fontFamily: 'Helvetica',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  section: {
    marginTop: 20
  },
  noEvent: {
    marginRight: '3%',
    fontSize: 16,
  }
})
