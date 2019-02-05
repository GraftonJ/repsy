import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions, Alert, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import getTheme from '../../native-base-theme/components'
import material from '../../native-base-theme/variables/material'
import platform from '../../native-base-theme/variables/platform'
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
  StyleProvider
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
    chosenCondition_id: '',
    addedCondition: store.getState().addedCondition,
    selected: store.getState().selected,
    toDelete: store.getState().toDelete,
  }
}

/*************************************
  GET conditions for logged in user
***************************************/
async getDocConditions () {
  //Get the conditions from the doctors_conditions route
    let conditions = []
    conditions = await getDoctorsConditions()
  //Set the store state with the conditions. This should cause local state to update and re-render
    store.setState({
      doctorsConditions: conditions,
    })
}

/************************************************************
Subscribe doctorsConditions state to the store to update on change
*************************************************************/
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

  //calls function to check for any updates to a user's conditions of interest
  this.getDocConditions()

  // filter through conditions to only display conditions in drop down that are related to logged-in user's specialty
  let conditionsList = []
  conditionsList = await getConditions()
  let specificConditions = conditionsList.filter(condition => condition.specialties_id === this.state.user.specialties_id)
  this.setState({
    specialtyConditions: specificConditions,
    isLoading: false,
  })
}

/**********************************************
  ADD SPECIALTY_CONDITION FUNCTION - POST to DB
**********************************************/
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
        store.setState({
          addedCondition: null,
        })

        //clears dropdown selected value
        this.onValueChange()

        //this function gets called again to update homepage conditions buttons
        this.getDocConditions()
    }
  }
  catch(err) {
    console.log("ERROR asyncTryAddCondition fetch failed: ", err)
  }
}

/************************************
  DELETE selected conditions function
    example from DB:
    -DELETE specified users record
    -http delete  http://localhost:3000/doctors_conditions/2
    -id is the unique id of the join table reference
*************************************/
  async tryDeleteCondition() {
    console.log('----------------tryDeleteCondition()')

    //error message is blank to begin with
    this.setState({
      errorMessage: ''
    })

    //variable to get unique id of join table reference
    //'toDelete' is set in store as the object to be deleted
    const join_id = store.getState().toDelete.join_id

    //creates url to try the delete with
    const url = `${URI}/doctors_conditions/${join_id}`

    //DELETE request
    try{
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        }
      })
      const responseJson = await response.json();

        // if it fails to delete, display error message
      if (!response.ok) {
        console.log('==== ', response.status, responseJson);
        this.setState({
          errorMessage: responseJson.error,
        })
        return
      }

      // if delete succeeded
      if(response.ok) {
        console.log('----------------- condition deleted!', responseJson)

      //this function gets called again to update homepage conditions buttons
          this.getDocConditions()
      }
    }
    catch(err) {
      console.log("ERROR asyncTryAddCondition fetch failed: ", err)
    }
  }

/******************************
  onValueChange for Drop Down
*****************************/
onValueChange (value: string) {
  //chosen is the condition the user selects from the drop down
  let chosen = this.state.specialtyConditions.find(chCondition => chCondition.name === value)

    store.setState({
      addedCondition: chosen,
      selected: value,
    })
}

/*******************************************************
  on press for clicking conditions to go to treatments page
************************************************************/
onPressButton = (name) => {
  store.setState({
    desired_info: {
      ...store.getState().desired_info,
      condition_name: name
    }
  });
  Actions.ConditionsPage()
}

/****************************************
on press for added condition to database
****************************************/
onPressAddCondition = async () => {
  console.log('trying to add')
  let duplicate = store.getState().doctorsConditions.find(condition => condition.name === store.getState().addedCondition.name)

  if(duplicate) {
    Alert.alert('You have already added this condition')
  }
  else {
    await this.asyncTryAddCondition()
  }
}

/****************************************
  onPress for deleting condition from "favorites"
*****************************************/
onPressDelete = async (id) => {
  console.log('Delete button hooked up!')

  //variable to isolate condition object user wants to delete
  let toDel = this.state.doctorsConditions.find(cond => cond.id === id)

  //sets store to hold the delete variable
  store.setState({
    toDelete: toDel
  })
  await this.tryDeleteCondition()
}

/******************************
  onPress logout
*****************************/
onPressLogout = () => {
  store.setState({
    user: null,
    isLoggedIn: false
  })
  console.log('***********STORE USER',store.getState().user)
  console.log('***********STORE LOGGEDIN', store.getState().isLoggedIn)
  Actions.FirstPage()
}

/*************************************
  disconnect from store notifications
**************************************/
componentWillUnmount(){
  this.unsubscribe()
}

  render() {
    //Show loading spinner if fetching data
    return (
      <StyleProvider style={getTheme(platform)}>
      <Container>
        <Header>
          <Left>
            <Text style={styles.headerName}>Hello {this.state.userName}</Text>
          </Left>
          <Body>
          </Body>
          <Right>
            <Text style={styles.repsyHeader}>REPSY</Text>
          </Right>
        </Header>
        <Content>
          <Text style={styles.title}>Conditions</Text>
          <Text style={styles.underline}>_______________</Text>
          { //Check if state is loading to show spinner
            (this.state.isLoading)
            ? <Spinner color='red' />
            :
            <Form>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "rgb(84, 157, 191)", fontSize: 25 }} />}
              style={styles.dropDown}
              placeholder="Select Conditions of Interest"
              placeholderStyle={{ color: "rgb(96, 29, 16)" }}
              note={false}
              onValueChange={this.onValueChange.bind(this)}
              headerStyle={{ backgroundColor: "rgb(84, 157, 191)" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={store.getState().selected}
              textStyle={{ color: "rgb(96, 29, 16)" }}
              >

              {this.state.specialtyConditions.map((specCond, idx) => (
                <Picker.Item

                  style={styles.pickerItem}
                  key={idx}
                  label={specCond.name}
                  value={specCond.name}
                  id={specCond.id}/>
              ))}
            </Picker>
          </Form>
          }
          {store.getState().addedCondition
            ?
          <View>
            <TouchableOpacity style={styles.addButton} onPress={this.onPressAddCondition}>
              <Text
                numberOfLines={1}
                ellipsizeMode='middle'
                style={styles.addText}>
                Add {store.getState().addedCondition.name} to your list
              </Text>
              <Icon
                style={styles.addIcon}
                name="add-circle"
              />
            </TouchableOpacity>
          </View>
          :
          <View></View>
        }
          {this.state.doctorsConditions.map((condition, idx) => (
            <View
              style={styles.view}
              key={idx}>

              <Icon
                style={styles.trashButton}
                onPress={() => this.onPressDelete(condition.id)}
                name='trash' />

            <Button
              style={styles.button}
              conditionId={condition.id}
              rounded style={styles.button}
              onPress={() => this.onPressButton(condition.name)}>
              <Text
                numberOfLines={1}
                ellipsizeMode='tail'
                style={styles.buttonText}>{condition.name}</Text>
            </Button>
          </View>
          ))}
          <TouchableOpacity

            onPress={this.onPressLogout}>
            <Text style={styles.logoutButton}>Logout</Text>
          </TouchableOpacity>
        </Content>
        <Footer>
          <FooterMenu/>
        </Footer>
      </Container>
    </StyleProvider>

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
  headerName: {
    fontFamily: 'Hoefler Text',
    fontSize: 15,
    color: 'rgb(96, 29, 16)',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 35,
    fontFamily: 'Hoefler Text',
    letterSpacing: 2,
    marginTop: "15%",
    alignSelf: 'center',
    color: 'rgb(96, 29, 16)',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 2,
  },
  underline: {
    fontSize: 20,
    fontFamily: 'Hoefler Text',
    marginTop: -5,
    marginBottom: '5%',
    alignSelf: 'center',
    color: 'rgb(96, 29, 16)',
    fontWeight: 'bold',
  },
  dropDown: {
    alignSelf: 'center',
  },
  addButton: {
    marginRight: 40,
    marginLeft: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  addText: {
    marginTop: 10,
    marginBottom: 20,
    fontFamily: 'Helvetica',
    fontSize: 18,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  addIcon: {
    marginTop: 5,
    marginLeft: 5,
  },
  addCondition: {
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 15,
  },
    button: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 15,
      margin: 3,
      width: '80%',
      alignSelf: 'flex-end',
    },
    buttonText: {
      fontFamily: 'Helvetica',
      fontSize: 20,
      justifyContent: 'center'
    },
    trashButton: {
      marginTop: 25,
      marginRight: 8,
      height: '40%',
    },
    spinner: {
      height: height
    },
    view: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    logoutButton: {
      alignSelf: 'center',
      marginTop: '15%',
      fontFamily: 'Hoefler Text',
      fontSize: 22,
      fontWeight: 'bold',
      letterSpacing: 1,
      color: 'rgb(84, 157, 191)',
      textShadowColor: 'rgba(189, 191, 193, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 1,
    }
});

console.disableYellowBox = true
