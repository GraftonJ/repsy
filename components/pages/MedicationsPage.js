import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body } from 'native-base'

import store, { URI } from '../../store'

const getMeds = async () => {
  const response = await fetch(`${URI}/meds`)
  const json = await response.json()
  return json
}

export default class MedicationsPage extends Component {

  constructor(props) {
  super(props);
  this.state = {
    meds: [],
  }
}

async componentDidMount(){
  console.log('component mounted')
  //get data from the API
  const response = await fetch(`${URI}/meds`)
  const json = await getMeds()
  console.log(json)
  this.setState({meds: json})
}
/**********************************************/
//  EXAMPlE MED DATA
    //meds: [
//    {
//      brand_name: "Adcetris"
//      created_at: "2019-01-21T00:48:12.185Z"
//      generic_name: "Brentuximab vedotin"
//      id: 1
//      info: "Adcetris is drug for oncology treatment"
//      pharma_company: "Farm Co."
//      photo: "https://i.pinimg.com/474x/ec/7d/ef/ec7def884205db98a059db3dee0d189c--munchkin-cat-cat-sitting.jpg"
//      updated_at: "2019-01-21T00:48:12.185Z"
//      }
//    ]
/* **************************************** */
// async componentDidMount() {
//   this.unsubscribe = store.onChange(() => {
//     this.setState({
//       meds: store.getState().meds,
//     })
//   })


    // Load meds
    // ----------------
    // let loadedMeds = [];
    // if (store.getState().searchForLatLon) {
    //   loadedLocations = await getResultsCurrentLocation();
    // } else {
    //   loadedLocations = await getResults(store.getState().searchFor);
    // }

  render() {

    return (
      <Container>
        <Header>
          <Left>
            <Button
              onPress={() => {Actions.Loginpage()}}>
              <Text>Login</Text>
            </Button>
          </Left>
          <Body>
            <Text>Medications</Text>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <Text>MEDICATIONS</Text>
        </Content>
        <Footer>
        </Footer>
      </Container>
    ) // End of return
  } // End of render

} // End of componenet

// Variables to changes the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

// Put styles in here to format the page
const styles = StyleSheet.create({

});
