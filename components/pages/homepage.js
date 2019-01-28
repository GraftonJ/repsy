import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';
import store, { URI } from '../../store'
import { getDoctorsConditions } from '../../utils/api'
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

import FooterMenu from '../elements/footermenu'

export default class Homepage extends Component {
  constructor(props) {
  super(props);
  this.state = {
    doctorsConditions: store.getState().doctorsConditions,
    desired_info: store.getState().desired_info,
    isLoading: true,
    userID: store.getState().user.id,
    userName: store.getState().user.fname,
  }
}

//Subscribe doctorsConditions state to the store to update on change
async componentDidMount(){
  this.unsubscribe = store.onChange(() => {
    this.setState({
      doctorsConditions: store.getState().doctorsConditions,
      desired_info: store.getState().desired_info,
      userID: store.getState().user.id
    })
  })
//Get the conditions from the doctors_conditions route
  let conditions = []
  conditions = await getDoctorsConditions()
//Set the store state with the conditions. This should cause local state to update and re-render
  store.setState({
    doctorsConditions: conditions,
  })
  this.setState({
    isLoading: false,
  })
}

// * *********************************** * //
onPressButton = (name) => {
  store.setState({
    desired_info: {
      condition_name: name
    }
  });
  Actions.ConditionsPage()
}

componentWillUnmount(){
  //disconnect from store notifications
  this.unsubscribe()
}

  render() {
    //Show loading spinner if fetching data
    return (
      <Container>
        <Header>
          <Left>
            <Text>Hello {this.state.userName}</Text>
          </Left>
          <Body>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <Text style={styles.title}>Selected Conditions</Text>
          { //Check if state is loading to show spinner
            (this.state.isLoading)
            ? <Spinner color='red' />
            : this.state.doctorsConditions.map((condition, idx) => (
              <Button
                style={styles.button}
                key={idx} conditionId={condition.id}
                rounded style={styles.button}
                onPress={() => this.onPressButton(condition.name)}>
                <Text style={styles.buttonText}>{condition.name}</Text>
              </Button>
            ))
          }
        </Content>
        <Footer>
          <FooterMenu/>
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
    button: {
      flexDirection: "row",
      justifyContent: "center",
      margin: 15,
      width: '80%',
      alignSelf: 'center',
    },
    buttonText: {
      fontFamily: 'Helvetica',
      fontSize: 20,
      justifyContent: 'center'
    },
    title: {
      fontSize: 35,
      fontFamily: 'Hoefler Text',
      marginTop: "15%",
      marginBottom: '5%',
      alignSelf: 'center',
    },
    spinner: {
      height: height
    }
});
