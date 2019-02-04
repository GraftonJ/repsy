import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { WebView } from 'react-native-webview'
import { Agenda } from 'react-native-calendars'
import { getBookings } from '../../utils/api'
import store, { URI } from '../../store'
import timekit from 'timekit-sdk'
import moment from 'moment'
import { 
  Platform, 
  StyleSheet, 
  View, 
  Text, 
  Dimensions, 
  Button, 
  DatePickerIOS 
} from 'react-native'
import { 
  Container, 
  Header, 
  Content, 
  Footer, 
  Left, 
  Right, 
  Body, 
  Toast, 
  Form, 
  Item, 
  Input, 
  Label, 
  Picker, 
  Icon, 
  Textarea 
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

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.calendarBookings !== this.state.calendarBookings) {
  //     getBookings()
  //     this.setState({
  //       calendarBookings: this.state.calendarBookings
  //     })
  //   }
  // }
  
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(this.state, nextState)
  //   if (nextState.calendarBookings !== this.state.calendarBookings) {
  //     return true
  //   }
  // }

  componentWillUnmount() {
    //disconnect from store notifications
    this.unsubscribe()
  }

  render() {
    console.log('bookings', this.state.calendarBookings)
    const {
      calendarBookings,
      calendarResources,
      chosenDate
    } = this.state

    return (
      <Container>
        <Header>
          <Left>
            <Button
              onPress={() => { Actions.Homepage() }} title='Home Page'>
            </Button>
          </Left>
          <Body>
            <Text>Requests</Text>
          </Body>
          <Right>
            <Button
              onPress={() => { this.viewAppointments() }} title='Appointments'>
            </Button>
          </Right>
        </Header>
        {
          (this.state.isLookingForAppointment)
            ?
            // <WebView source={{ html: htmlContent }} />
            <Content>
              <Form>
                <Item picker>
                <Label>Pharma Rep</Label>
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
                <Item>
                  <Icon active name='ios-call' />
                  <Input placeholder='Contact Number' />
                </Item>
                <Item stackedLabel>
                  <Label>Reason For Appointment</Label>
                  <Textarea rowSpan={5} width={340} bordered />
                </Item>
                <Item>
                  <View style={styles.container}>
                    <Label>Appointment Time/Date (MST)</Label>
                    <DatePickerIOS
                      date={chosenDate}
                      onDateChange={this.setDate}
                      minuteInterval={15}
                    />
                  </View>
                  {console.log('chosenDate', chosenDate)}
                  {console.log('this.state', this.state)}
                 </Item>
              </Form>
            </Content>
            : <Agenda
              items={calendarBookings}
              selected={new Date()}
              renderItem={this.renderItem.bind(this)}
              rowHasChanged={this.rowHasChanged.bind(this)}
              theme={{ agendaKnobColor: 'grey' }}
              renderEmptyData={this.renderEmptyData.bind(this)}
            />
        }
      <Footer>
          {
            (this.state.isLookingForAppointment)
              ? <Button onPress={() => this.createNewBookingRequest()} title="Submit New Request" />
              : <Button onPress={() => this.requestAppointment()} title="Create New Request" />
          }
      </Footer>
      </Container>
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


  // Create a new Booking Request to desired Resource
  createNewBookingRequest = async () => {
    try {
      // timekit.updateBooking({ id:'b53f8655-b52e-43b6-a811-e5e3b694866e', action: "confirm"})
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

  // Switch Statement for Confirm|Decline|Delete event Button
  renderSwitch(item) {
    switch (item.state) {
      case 'tentative':
        return <View>
          <Button
            title='Confirm'
            id='confirm'
            style={[styles.button]}
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
          </Button>
          <Button
            title='Decline'
            onPress={() => {
              // this will update a booking to a new status
              timekit.updateBooking({
                id: item.booking_id,
                action: "decline" // or "decline" or "cancel"
              }).then((res) => {
                console.log('hello')
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
          </Button>
        </View>
        break;
      case 'confirmed':
        console.log('confirmed item canceled')
        return <Button
          title='Cancel'
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
        </Button>
        break;
      default:
        return <Text>Appointment Declined</Text>
    }
  }

  // Scheme for Rendering Bookings onto Agenda View
  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Label>Doctor: {item.customer_name}</Label>
        <Label>Pharma Rep: {/*store.getState().user.name?*/}</Label>  
        <Text>{item.event_name}</Text>
        <Item style={{ width: 200 }}>
          <Icon active name='ios-time' />
          <Text style={{ textAlign: 'center' }}>{moment(item.event_start).format('MMMM Do YYYY, h:mm:ss a')}-{moment(item.event_end).format('MMMM Do YYYY, h:mm:ss a')}</Text>
        </Item>
        <Item style={{ width: 200 }}>
          <Icon active name='ios-navigate' />
          <Text style={{ textAlign: 'center' }}>{item.event_location}</Text>
        </Item>
        {/* {console.log('item', item)} */}
        <Icon active name='ios-filing' />
        
        <View >{this.renderSwitch(item)}</View>
      </View>
    )
  }
  // Scheme for Rendering Empty Agenda Days
  renderEmptyData(item) {
    return (
      <View style={styles.emptyDate}>
        <Text>No Events Today!</Text>
        <Button onPress={() => this.requestAppointment()} title="Create New Request" />
      </View>
    )
  }
  // Checks to See if Agenda has changed to refresh data
  rowHasChanged(r1, r2) {
    if(r1.name !== r2.name) {
      getBookings()
      console.log('hello rows have changed')
    }
  }

} // End of componenet

// Variables to change the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const htmlContent = `
  <div id="bookingjs"></div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" defer></script>
  <script src="https://cdn.timekit.io/booking-js/v2/booking.min.js" defer></script>
  <script>
  window.timekitBookingConfig = {
    app_key: 'test_widget_key_Pgedqmou2J9S6qtxYEo4rnJBDJD3dLS1',
    project_id: '990a0b41-9ec1-4549-81fc-e82ae3403fc5'
  }
  </script>`

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  button: {
    color: 'red',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  }
})
