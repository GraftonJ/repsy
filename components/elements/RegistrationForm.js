import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body, Form, Icon, Picker } from 'native-base'

import store, { URI } from '../../store'
import { getSpecialties } from '../../utils/api'


export default class ConditionsPage extends Component {
  constructor(props) {
  super(props);
  this.state = {
    selected: undefined,
    specialties: [],
  };
}
onValueChange(value: string) {
  this.setState({
    selected: value,
    specialties: this.state.specialties
  });
}

async componentDidMount(){
  console.log('******************component mounted')
  //get data from the API
  const response = await fetch(`${URI}/specialties`)
  const json = await getSpecialties()
  console.log(json)
  this.setState({specialties: json})
  console.log(json[0])
}


  render() {

    return (
      <Container>
        <Header />

        <Content>
          <Form>
         <Picker
           mode="dropdown"
           placeholder="Select One"
           placeholderStyle={{ color: "#2874F0" }}
           note={false}
           selectedValue={this.state.selected}
           onValueChange={this.onValueChange.bind(this)}>

           {this.state.specialties.map((specialty, idx) => (
             <Picker.Item key={idx} label={specialty.name} value={specialty.name}/>
           ))}

         </Picker>
       </Form>
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
