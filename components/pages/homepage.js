import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions, Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';
import store, { URI } from '../../store'
import { getDoctorsConditions, getConditions } from '../../utils/api'
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
  Picker,
  Form,
} from 'native-base'

import FooterMenu from '../elements/FooterMenu'

export default class Homepage extends Component {
  constructor(props) {
  super(props);
  this.state = {
    specialtyConditions: [],
    doctorsConditions: store.getState().doctorsConditions,
    desired_info: store.getState().desired_info,
    isLoading: true,
    // userID: store.getState().user.id,
    userName: store.getState().user.fname,
    user: store.getState().user,
    isLoggedIn: store.getState().isLoggedIn,
    errorMessage: '',
    selected: null,
    chosenCondition_id: '',
    addedCondition: store.getState().addedCondition,
    selected: store.getState().selected
  }
}

/******************************/
//onValueChange
/*****************************/
onValueChange (value: string) {
  let chosen = this.state.specialtyConditions.find(chCondition => chCondition.name === value)
  // console.log(chosen, chosen.id)
  let duplicate = store.getState().doctorsConditions.find(condition => condition.name === chosen.name)

  if(duplicate) {
    store.setState({
      addedCondition: null,
      selected: '',
    })
  }

  if(!duplicate) {
    store.setState({
      addedCondition: chosen,
      selected: value,
    })
console.log('store.getState().addedCondition:', store.getState().addedCondition)
console.log('this.state.user.id', this.state.user.id)
  }
}

async getDocConditions () {
  //Get the conditions from the doctors_conditions route
    let conditions = []
    conditions = await getDoctorsConditions()
  //Set the store state with the conditions. This should cause local state to update and re-render
    store.setState({
      doctorsConditions: conditions,
    })
}


//Subscribe doctorsConditions state to the store to update on change
async componentDidMount(){
  this.unsubscribe = store.onChange(() => {
    this.setState({
      doctorsConditions: store.getState().doctorsConditions,
      desired_info: store.getState().desired_info,
      // userID: store.getState().user.id,
      user: store.getState().user,
      isLoggedIn: store.getState().isLoggedIn
    })
  })

this.getDocConditions()

  // get all conditions
  let conditionsList = []
  conditionsList = await getConditions()
  let specificConditions = conditionsList.filter(condition => condition.specialties_id === this.state.user.specialties_id)
  this.setState({
    specialtyConditions: specificConditions,
    isLoading: false,
  })
  // console.log('+++++++++++++++Specialty Conditions', this.state.specialtyConditions)
}


// conditions_id: store.getState().addedCondition.id
// checkAddedCondition() {
  //get doctorsConditions array from the store
  //check to see if addedCondition.id is in that array
  //if it is, throw an error
// }

//ADD SPECIALTY_CONDITION FUNCTION
async asyncTryAddCondition() {
  console.log("---------- asyncTryAddCondition(): ")
//set errorMessage to nothing to begin with
  this.setState({
    errorMessage: ''
  })
//create variable for body of post
  const body = {
    doctors_id: this.state.user.id,
    conditions_id: store.getState().addedCondition.id
  }
  console.log('THIS IS THE BODY FOR POST________', body)
  //ROUTE to hit for DB
  const url = `${URI}/doctors_conditions`
  //POST request to DB

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    const responseJson = await response.json();
    console.log('^^^^^^^^^^^^^^responseJson', responseJson)

    // if the new account fails, display error message
      if (!response.ok) {
        console.log('==== ', response.status, responseJson);
        this.setState({
          errorMessage: responseJson.error,
        })
        return
      }
      // new condition succeeded!
      if(response.ok) {
        console.log('++++++++++++ new condition added!', responseJson)

          this.getDocConditions()
    }
  }
  catch(err) {
    console.log("ERROR asyncTryAddCondition fetch failed: ", err)
  }
}




// async addMessage(message) {
//    const response = await fetch(`${API}`, {
//      method: 'POST',
//      headers: {
//        "Content-Type": "application/json; charset=utf-8"
//      },
//      body: JSON.stringify(message)
//    })
//    if(response.status === 200) {
//      const json = await response.json()
//      console.log("POST", json)
//
//      this.setState({ messages: [...this.state.messages, json], composing: false})
//    }
//    else {
//      console.error("Could not post", response.statusText)
//    }
//  }



// * *********************************** * //
//on press for clicking conditions to go to treatments page
onPressButton = (name) => {
  store.setState({
    desired_info: {
      ...store.getState().desired_info,
      condition_name: name
    }
  });
  Actions.ConditionsPage()
}

/****************************************/
//on press for added condition to database
onPressAddCondition = async () => {
  console.log('trying to add')
    await this.asyncTryAddCondition()
}

//******************************/
//onPress logout
onPressLogout = () => {
  Alert.alert('Bye now! Thanks for using Repsy!')
  store.setState({
    user: null,
    isLoggedIn: false
  })
  console.log('***********STORE USER',store.getState().user)
  console.log('***********STORE LOGGEDIN', store.getState().isLoggedIn)
  Actions.FirstPage()
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
            <Text style={styles.repsyHeader}>REPSY</Text>
          </Right>
        </Header>
        <Content>
          <Text style={styles.title}>Selected Conditions</Text>
          { //Check if state is loading to show spinner
            (this.state.isLoading)
            ? <Spinner color='red' />
            :
            <Form>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
              style={{ width: undefined }}
              placeholder="Select Conditions of Interest"
              placeholderStyle={{ color: "rgb(79, 79, 78)" }}
              note={false}
              onValueChange={this.onValueChange.bind(this)}
              headerStyle={{ backgroundColor: "#2874F0" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={store.getState().selected}>

              {this.state.specialtyConditions.map((specCond, idx) => (
                <Picker.Item key={idx} label={specCond.name} value={specCond.name} id={specCond.id}/>
              ))}
            </Picker>
          </Form>
          }
          <Button
            onPress={this.onPressAddCondition}>
            <Text>Add Condition</Text>
          </Button>
          <Button
            onPress={this.onPressLogout}
            dark>
            <Text>Logout</Text>
          </Button>
          {this.state.doctorsConditions.map((condition, idx) => (
            <Button
              style={styles.button}
              key={idx} conditionId={condition.id}
              rounded style={styles.button}
              onPress={() => this.onPressButton(condition.name)}>
              <Text style={styles.buttonText}>{condition.name}</Text>
            </Button>
          ))}
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
  repsyHeader: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 20,
    color: 'rgb(96, 29, 16)'
  },
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
