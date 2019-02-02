import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions, Button, DatePickerIOS } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Left, Right, Body, Toast, Form, Item, Input, Label, Picker, Icon, DatePicker } from 'native-base'
import { WebView } from 'react-native-webview'
import { Calendar, CalendarList, Agenda, Arrow } from 'react-native-calendars'
import { getBookings } from '../../utils/api'

import store, { URI } from '../../store'
import timekit from 'timekit-sdk'
import moment from 'moment'

// import { LocaleConfig } from 'react-native-calendars';

// LocaleConfig.locales['fr'] = {
//   monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
//   monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
//   dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
//   dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
// };

// LocaleConfig.defaultLocale = 'fr';

export default class RequestsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: store.getState().user.id,
      items: store.getState().items,
      calendarBookings: store.getState().calendarBookings,
      calendarResources: store.getState().calendarResources,
      isLookingForAppointment: false,
      chosenDate: currentDate,
      bookingRequest: {
        resource_id: 'e4b663d4-8ea8-44ab-8685-dfbf5cf4b699',
        graph: 'confirm_decline',
        start: '2019-02-10T14:30:00-06:00',
        end: '2019-02-10T15:00:00-07:00',
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
  //     this.setState({
  //       calendarBookings: this.state.calendarBookings
  //     })
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

    // this.createNewBookingRequest()

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
                <Item floatingLabel>
                  <Label>Resource</Label>
                  <Input />
                </Item>
                <Item floatingLabel last>
                  <Label>Password</Label>
                  <Input secureTextEntry/>
                </Item>
                <Item picker>
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
                  <View style={styles.container}>
                    <DatePickerIOS
                      date={this.state.chosenDate}
                      onDateChange={this.setDate}
                    />
                  </View>
                  {/* <DatePicker
                    defaultDate={currentDate}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    placeHolderText={currentDate + 'or Select Date'}
                    textStyle={{ color: "green" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={this.setDate.bind(this)}
                    disabled={false}
                  /> */}
                  {console.log('chosenDate', chosenDate)}
                  {console.log('this.state', this.state)}
                 </Item>
              </Form>
            </Content>
            : <Agenda
              items={calendarBookings}
              selected={currentDate}
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
    this.setState({ chosenDate: newDate });
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

    getBookings()
    this.viewAppointments()
  }

  // Switch Statement for Confirm|Decline|Delete event Button
  renderSwitch(item) {
    switch (item.state) {
      case 'tentative':
        console.log('item tentative')
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
                getBookings()
                console.log('res', res)
                return res
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
        <Text>{item.name}</Text>
        {console.log('item', item)}
        <View>{this.renderSwitch(item)}</View>
      </View>
    )
  }

  renderEmptyData(item) {
    return (
      <View style={styles.emptyDate}>
        <Text>No Events Today!</Text>
        <Button onPress={() => this.requestAppointment()} title="Create New Request" />
      </View>
    )
  }

  rowHasChanged(r1, r2) {
    if(r1.name !== r2.name) {
      getBookings()
    }
  }


} // End of componenet

// Variables to change the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


//  const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//  const strTime = this.timeToString(time);
let currentDate = new Date()
// let yesterdayDate = new Date().setDate(currentDate.getDate() - 1)
let tomorrowDate = moment().format()
// let nextMonthDate = new Date().setMonth(currentDate.getMonth() + 1)
// const vacation = { key: 'vacation', color: 'blue', selectedDotColor: 'blue' };
// const massage = { key: 'massage', color: 'orange', selectedDotColor: 'orange' };
// const workout = { key: 'workout', color: 'red' };

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
