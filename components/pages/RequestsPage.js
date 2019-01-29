import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Left, Right, Body } from 'native-base'
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
      isLookingForAppointment: false,
    }
  }

  async componentDidMount() {
    this.unsubscribe = store.onChange(() => {
      this.setState({
        items: store.getState().items
      })
    })
    //Get the conditions from the doctors_conditions route
    await getBookings()
  }

  //Request new Appointment function for create request button
  requestAppointment = () => {
    this.setState({
      isLookingForAppointment: true,
    })
  }

  viewAppointments = () => {
    this.setState({
      isLookingForAppointment: false,
    })
  }

  componentWillUnmount() {
    //disconnect from store notifications
    this.unsubscribe()
  }

  render() {

    const timeToString = (time) => {
      const date = new Date(time)
      return date.toISOString().split('T')[0]
    }

    // Variable to load in calendar data
    let calendarData = {}

    // Loads the calendarData variable with all the relevant appointments
    this.state.items.forEach((x) => {
      //console.log('x', x)
      let event = x.attributes.event
      const date = timeToString(event.start)
      //console.log('time', date)

      // Cycles through and creates the objects for the timekit according
      // to the timekits desired format: {'Year-Month-Day': [{name: "Description"}]'}
      if (!calendarData[date]) {
        calendarData[date] = [{ name: `${event.what}` }]
      } else {
        calendarData[date].push({ name: `${event.what}` })
      }

      //console.log("Calendar Data ====>", calendarData)

      return calendarData

    })
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
              onPress={() => { this.viewAppointments() }} title='Current Appointments'>
            </Button>
          </Right>
        </Header>
        { //Check if state is looking for appointment
          (this.state.isLookingForAppointment)
            ?
            <WebView source={{ html: htmlContent }} />
            : <Agenda
              items={calendarData}
              selected={currentDate}
              renderItem={this.renderItem.bind(this)}
              // renderEmptyDate={this.renderEmptyDate.bind(this)}
              rowHasChanged={this.rowHasChanged.bind(this)}
              theme={{ agendaKnobColor: 'grey' }}

              // // the list of items that have to be displayed in agenda. If you want to render item as empty date
              // // the value of date key kas to be an empty array []. If there exists no value for date key it is
              // // considered that the date in question is not yet loaded
              // items={
              //   {
              //     '2019-01-28': [{ name: 'item 1 - any js object' }, { name: 'item 2 - any js object' }],
              //     '2019-01-29': [{ name: 'item 2 - any js object' }],
              //     '2019-01-30': [],
              //     '2019-02-01': [{ name: 'item 3 - any js object' }, { name: 'any js object' }],
              //   }}
              // // callback that gets called when items for a certain month should be loaded (month became visible)
              // loadItemsForMonth={(month) => { console.log('trigger items loading') }}
              // // callback that fires when the calendar is opened or closed
              // onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }}
              // // callback that gets called on day press
              // onDayPress={(day) => { console.log('day pressed') }}
              // // callback that gets called when day changes while scrolling agenda list
              // onDayChange={(day) => { console.log('day changed') }}
              // // initially selected day
              // selected={currentDate}
              // // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              // // minDate={yesterdayDate}
              // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              // maxDate={nextMonthDate}
              // // Max amount of months allowed to scroll to the past. Default = 50
              // pastScrollRange={50}
              // // Max amount of months allowed to scroll to the future. Default = 50
              // futureScrollRange={50}
              // // specify how each item should be rendered in agenda
              // renderItem={(item, firstItemInDay) => { return (<View />); }}
              // // specify how each date should be rendered. day can be undefined if the item is not first in that day.
              // renderDay={(day, item) => { return (<View />); }}
              // // specify how empty date content with no items should be rendered
              // renderEmptyDate={() => { return (<View />); }}
              // // specify how agenda knob should look like
              // renderKnob={() => { return (<View />); }}
              // // specify what should be rendered instead of ActivityIndicator
              renderEmptyData={() => {
                return (
                  <View style={styles.emptyDate}><Text>No Events Today!</Text><Button onPress={() => this.requestAppointment()} title="Create New Request" /></View>
                )
              }}
            // // specify your item comparison function for increased performance
            // rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
            // // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
            // onRefresh={() => console.log('refreshing...')}
            // // Set this true while waiting for new data from a refresh
            // refreshing={false}
            // // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
            // refreshControl={null}
            />
        }

      <Footer>
          <Button onPress={() => this.requestAppointment()} title="Create New Request" />
      </Footer>
      </Container>
    ) // End of return
  } // End of render

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name
  }


} // End of componenet

// Variables to change the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


//  const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//  const strTime = this.timeToString(time);
let currentDate = new Date()
// let yesterdayDate = new Date().setDate(currentDate.getDate() - 1)
// let tomorrowDate = new Date().setDate(currentDate.getDate() + 1)
// let nextMonthDate = new Date().setMonth(currentDate.getMonth() + 1)
// const vacation = { key: 'vacation', color: 'blue', selectedDotColor: 'blue' };
// const massage = { key: 'massage', color: 'orange', selectedDotColor: 'orange' };
// const workout = { key: 'workout', color: 'red' };

const htmlContent = `
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
  }
})
