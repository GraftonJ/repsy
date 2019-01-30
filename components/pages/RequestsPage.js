import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Left, Right, Body, Toast } from 'native-base'
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
    })
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
    getBookings()
  }

  componentWillUnmount() {
    //disconnect from store notifications
    this.unsubscribe()
  }

  render() {
    const {
      calendarBookings
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
            <WebView source={{ html: htmlContent }} />
            : <Agenda
              items={calendarBookings}
              selected={currentDate}
              renderItem={this.renderItem.bind(this)}
              rowHasChanged={this.rowHasChanged.bind(this)}
              theme={{ agendaKnobColor: 'grey' }}
              renderEmptyData={() => {
                return (
                  <View style={styles.emptyDate}><Text>No Events Today!</Text><Button onPress={() => this.requestAppointment()} title="Create New Request" /></View>
                )
              }}
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
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.name}</Text>
        <Button
          title='Toast'
          onPress={() =>
            Toast.show({
              text: "Wrong password!",
              buttonText: "Okay",
              buttonTextStyle: { color: "#008000" },
              buttonStyle: { backgroundColor: "#5cb85c" }
            })}
        >
          <Text>Toast</Text>
        </Button>
      </View>    );
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


