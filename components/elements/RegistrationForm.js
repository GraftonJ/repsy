import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body, Form, Icon, Picker, Item, Input } from 'native-base'

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
            <Item>
              <Input placeholder="First Name" />
            </Item>
            <Item>
              <Input placeholder="Last Name" />
            </Item>
           <Picker
             mode="dropdown"
             placeholder="Select a Specialty"
             placeholderStyle={{ color: "#2874F0" }}
             note={false}
             selectedValue={this.state.selected}
             onValueChange={this.onValueChange.bind(this)}
             headerStyle={{ backgroundColor: "#2874F0" }}
             headerBackButtonTextStyle={{ color: "#fff" }}
             headerTitleStyle={{ color: "#fff" }}>
             {this.state.specialties.map((specialty, idx) => (
               <Picker.Item key={idx} label={specialty.name} value={specialty.name}/>
             ))}
           </Picker>
           <Item>
             <Input placeholder="NPI #" />
           </Item>
           <Item>
             <Input placeholder="Clinic Name" />
           </Item>
           <Item>
             <Input placeholder="Clinic Address" />
           </Item>
           <Item>
             <Input placeholder="City" />
           </Item>
           <Item>
             <Input placeholder="State" />
           </Item>
           <Item>
             <Input placeholder="Zip" />
           </Item>
           <Button block>
             <Text>Submit</Text>
          </Button>
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
