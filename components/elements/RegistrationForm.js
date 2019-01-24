import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions, InputText } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body, Form, Icon, Picker, Item, Input } from 'native-base'

import store, { URI } from '../../store'
import { getSpecialties } from '../../utils/api'



export default class ConditionsPage extends Component {
  constructor(props) {
  super(props);
  this.state = {
      // local state
      // ---------------
    selected: undefined,
    specialties: [],
    errorMessage: '',
    // Field keys match db table fields
      fname: '', // holds the form value
      lname: '',
      specialties_id: '',
      npi_num: '',
      clinic_name: '',
      clinic_address: '',
      city: '',
      state: '',
      zip: 0,
      email: '',
      password: "",
  }
}
/************************************/
//ON CHANGE EVENT FOR SELECT SPECIALTY
onValueChange(value: string) {
  let specialty = this.state.specialties.find(specialty => specialty.name === value)
  console.log('$$$$$$$$$$$$$$$$$$$$', specialty.id)
  this.setState({
    selected: value,
    specialties_id: specialty.id,
    specialties: this.state.specialties,
  });
}

/***********************************/
//LOADS SPECIALTIES FROM DATABASE
async componentDidMount(){
  console.log('******************component mounted')
  //get data from the API
  const response = await fetch(`${URI}/specialties`)
  const json = await getSpecialties()
  // console.log(json)
  this.setState({specialties: json})
  // console.log(json[0])
}
//OPT 1: compare value to name in specialties array and set id equal to that
// OPT 2:

// specialtyId(selected) {
//   let specialtyObject = specialties.find(specialty => specialty.name === this.state.selected)
//   console.log(specialtyObject)
// }


// /************************************/
// //ADD DOCTOR FUNCTION
// async asyncTryAddDoctor(doctor) {
//   console.log("-- asyncTryAddUser(): ", doctor);
//
//   this.setState({
//     errorMessage: '',
//   })
//
//   const body = user;
//   const url = `${URI}/users`;
//
//   try {
//
//     // call login route
//     const response = await fetch(url, {
//       method: 'POST',
//       body: JSON.stringify(body),
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//     });
//
//     const responseJson = await response.json();
//     console.log(")) after response split");
//
//     // if the new account fails, display error message
//     if (!response.ok) {
//       console.log('==== ', response.status, responseJson);
//       this.setState({
//         errorMessage: responseJson.error,
//       })
//       return;
//     }
//
//     // new account succeeded!
//     console.log("('==== new acct added!: ", responseJson.user);
//     responseJson.user.dogNames = responseJson.user.dog_names; // kludge b/c the comments expect 'dogNames'
//     store.setState({
//       user: responseJson.user,
//       isLoggedIn: true,
//     });
//     // this.setState({
//     //   value: {
//     //     name: '', // holds the form value
//     //     email: '',
//     //     password: "",
//     //     dog_names: "",
//     //     dogNames: "",
//     // }});
//     this.props.newAccountAddedCB();
//   }
//   catch(err) {
//     console.log("ERROR asyncTryAddUser fetch failed: ", err);
//   }
// }
//
// /* ***Î****************************************** */
// onpressSubmit = async () => {
//   console.log("onpressSubmit()");
//   var user = this.refs.myform.getValue();
//
//   // check that user filled in the fields
//   if (!user)
//     return;
//
//   console.log("Adding user: ", user);
//   await this.asyncTryAddUser(user)
// }


onpressSubmit = (ev,) => {
  ev.preventDefault()
  console.log('************onpressSubmit()')
  console.log('^^^^^^^^^^^^^^STATE', this.state)
  console.log('~~~~~~~~~~~~~~~~~~~SPECIALTIES_ID', this.state.specialties_id)
}



  render() {

    return (
        <Content>
          <Form >
            <Item>
              <Input
                onChangeText={(text) => this.setState({fname: text})}
                placeholder="First Name"
                />
            </Item>
            <Item>
              <Input
                onChangeText={(text) => this.setState({lname: text})}
                placeholder="Last Name" />
            </Item>
           <Picker
             mode="dropdown"
             iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
             style={{ width: undefined }}
             placeholder="Select a Specialty"
             placeholderStyle={{ color: "rgb(79, 79, 78)" }}
             note={false}
             selectedValue={this.state.selected}
             onValueChange={this.onValueChange.bind(this)}
             headerStyle={{ backgroundColor: "#2874F0" }}
             headerBackButtonTextStyle={{ color: "#fff" }}
             headerTitleStyle={{ color: "#fff" }}>
             {this.state.specialties.map((specialty, idx) => (
               <Picker.Item key={idx} label={specialty.name} value={specialty.name} id={specialty.id}/>
             ))}
           </Picker>
           <Item>
             <Input
               onChangeText={(text) => this.setState({npi_num: text})}
               placeholder="NPI #" />
           </Item>
           <Item>
             <Input
               onChangeText={(text) => this.setState({clinic_name: text})}
               placeholder="Clinic Name" />
           </Item>
           <Item>
             <Input
               onChangeText={(text) => this.setState({clinic_address: text})}
               placeholder="Clinic Address" />
           </Item>
           <Item>
             <Input
               onChangeText={(text) => this.setState({city: text})}
               placeholder="City" />
           </Item>
           <Item>
             <Input
               onChangeText={(text) => this.setState({state: text})}
               placeholder="State" />
           </Item>
           <Item>
             <Input
               onChangeText={(text) => this.setState({zip: text})}
               placeholder="Zip" />
           </Item>
           <Button  onPress={this.onpressSubmit} type="submit" block>
             <Text>Submit</Text>
          </Button>
        </Form>
        </Content>
    ) // End of return
  } // End of render

} // End of componenet

// Variables to changes the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

// Put styles in here to format the page
const styles = StyleSheet.create({

});
