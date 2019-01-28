import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body } from 'native-base'
import { WebView } from 'react-native-webview'
import { Calendar, CalendarList, Agenda, Arrow } from 'react-native-calendars'

import store, { URI } from '../../store'


// import { google } from 'googleapis'
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
    items: {}
  }
  
}

  render() {
    var htmlContent = `
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
    let currentDate = new Date()
    let yesterdayDate = new Date().setDate(currentDate.getDate() - 1)
    let tomorrowDate = new Date().setDate(currentDate.getDate() + 1)
    let nextMonthDate = new Date().setMonth(currentDate.getMonth() + 1)
    const vacation = { key: 'vacation', color: 'blue', selectedDotColor: 'blue' };
    const massage = { key: 'massage', color: 'orange', selectedDotColor: 'orange' };
    const workout = { key: 'workout', color: 'red' };
    // // Day Select for Month Calendar
    // onDayPress = (day) => {

    //     console.log('selected day', day)

    //     // this.setState({
    //     //   selected: day.dateString
    //     // })
    //   }
    //Load Day Items for Agenda View
    // function listEvents(auth) {
    //   const calendar = google.calendar({ version: 'v3', auth });
    //   calendar.events.list({
    //     calendarId: 'primary',
    //     timeMin: (new Date()).toISOString(),
    //     maxResults: 10,
    //     singleEvents: true,
    //     orderBy: 'startTime',
    //   }, (err, res) => {
    //     if (err) return console.log('The API returned an error: ' + err);
    //     const events = res.data.items;
    //     if (events.length) {
    //       console.log('Upcoming 10 events:');
    //       events.map((event, i) => {
    //         const start = event.start.dateTime || event.start.date;
    //         console.log(`${start} - ${event.summary}`);
    //       });
    //     } else {
    //       console.log('No upcoming events found.');
    //     }
    //   });
    // }

    return (
      <Container>
        <Header>
          <Left>
            <Button
              onPress={() => {Actions.Homepage()}}>
              <Text>Home Page</Text>
            </Button>
          </Left>
          <Body>
            <Text>Requests</Text>
          </Body>
          <Right>
          </Right>
        </Header>
          <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItems.bind(this)}
            selected={currentDate}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
            theme={{ agendaKnobColor: 'grey' }}

            // // the list of items that have to be displayed in agenda. If you want to render item as empty date
            // // the value of date key kas to be an empty array []. If there exists no value for date key it is
            // // considered that the date in question is not yet loaded
            // items={
            //   {
            //     '2019-01-28': [{ text: 'item 1 - any js object' }],
            //     '2019-01-29': [{ text: 'item 2 - any js object' }],
            //     '2019-01-30': [],
            //     '2019-02-01': [{ text: 'item 3 - any js object' }, { text: 'any js object' }],
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
            // renderEmptyData={() => { return (<View />); }}
            // // specify your item comparison function for increased performance
            // rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
            // // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
            // onRefresh={() => console.log('refreshing...')}
            // // Set this true while waiting for new data from a refresh
            // refreshing={false}
            // // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
            // refreshControl={null}
              />
          <WebView source={{ html: htmlContent }} />
          {/* <Calendar
            // Initially visible month. Default = Date()
            current={currentDate}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={yesterdayDate}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={nextMonthDate}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={onDayPress}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={(day) => { console.log('selected day', day) }}
            //If you need custom functionality not supported by current day component implementations you can pass your own custom day component to the calendar.
            // dayComponent={({ date, state }) => {
            //   return (<View style={{ flex: 1 }}><Text style={{ textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>{date.day}</Text></View>);
            // }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => { console.log('month changed', month) }}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            // renderArrow={(direction) => (<Arrow />)}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            markedDates={{
              '2019-01-16': { dots: [vacation, massage, workout], selected: true, marked: true, selectedColor: 'teal' },
              '2019-01-17': { dots: [workout], marked: true },
              '2019-01-18': { dots: [massage], marked: true, activeOpacity: 0 },
              '2019-01-19': { disabled: true, disableTouchEvent: true },
            }}
            markingType={'multi-dot'}
          /> */}

          
      </Container>
    ) // End of return
  } // End of render


  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>No Events Today!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
} // End of componenet

// Variables to change the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
})
