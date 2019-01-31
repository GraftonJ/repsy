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
  store.setState({
    addedCondition: chosen,
    selected: value,
  })
console.log('store.getState().addedCondition:', store.getState().addedCondition)
console.log('this.state.user.id', this.state.user.id)

  // store.setState({
  //   selected: value,
  //   doctorsConditions: chosenCondition,
  // });
  // console.log('++++++++++NEW CONDITION ADDED!!!!!', store.getState().doctorsConditions)
}
// const doctorConditions = async() => {
//   // get all conditions
//   let conditionsList = []
//   conditionsList = await getConditions()
//   let specificConditions = conditionsList.filter(condition => condition.specialties_id === this.state.user.specialties_id)
//   this.setState({
//     specialtyConditions: specificConditions,
//     isLoading: false,
//   })
// }

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

  this.setState({
    errorMessage: '',
  })

let existing = this.state.doctorsConditions.filter(condition => condition.id === store.getState().addedCondition.id)
if(existing) {
  console.log('condition has already been added')
  Alert.alert('You have already chosen this condition')
  return
}
  //get doctorsConditions array from the store
  //check to see if addedCondition.id is in that array
  //if it is, throw an error

//POST request for doctorsConditions
  // router.post('/', validatePostBody, (req, res, next) => {
  //   const {id, doctors_id, conditions_id} = req.body
  const body = {
    doctors_id: store.getState().user.id,
    conditions_id: store.getState().addedCondition.id,
  }
  const url = `${URI}/doctors_conditions`

  try {
    // call login route
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    const responseJson = await response.json();
    // console.log(responseJson.doctor)
    //{id: 8, fname: sherman, lname: potter...}

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

      // store.setState({
      //   ...store.state,
      //   doctorsConditions: responseJson
      //
    }
  }
  catch(err) {
    console.log("ERROR asyncTryAddCondition fetch failed: ", err)
  }
}





// * *********************************** * //
onPressButton = (name) => {
  store.setState({
    desired_info: {
      ...store.getState().desired_info,
      condition_name: name
    }
  });
  Actions.ConditionsPage()
}
//on press for added condition to database
onPressAddCondition = async () => {
  console.log('condition added to the DB!')

  await this.asyncTryAddCondition()
}



componentWillUnmount(){
  //disconnect from store notifications
  this.unsubscribe()
}





//DOCTORS CONDITONS BUTTON PULLED FROM render
// this.state.doctorsConditions.map((condition, idx) => (
//   <Button
//     style={styles.button}
//     key={idx} conditionId={condition.id}
//     rounded style={styles.button}
//     onPress={() => this.onPressButton(condition.name)}>
//     <Text style={styles.buttonText}>{condition.name}</Text>
//   </Button>
// ))








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
