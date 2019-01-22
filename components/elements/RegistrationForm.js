import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body, Form, Item, Input } from 'native-base'

import store, { URI } from '../../store'
import { getSpecialties } from '../../utils/api'

export default class Registrationform extends Component {

  constructor(props){
    super(props)
      this.state = {
        specialties: []
      }
  }

  async componentDidMount(){
    console.log('******************component mounted')
    //get data from the API
    const response = await fetch(`${URI}/specialties`)
    const json = await getSpecialties()
    console.log(json)
    this.setState({specialties: json})
  }






    render() {

        return (
            <Content>
                <Text>Register with Repsy!</Text>
                <Form>
                <Item>
                  <Input placeholder="First Name" />
                </Item>
                <Item>
                  <Input placeholder="Last Name" />
                </Item>
                <Picker>

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
                <Item>
                  <Input placeholder="email" />
                </Item>
                <Item>
                  <Input placeholder="Password" />
                </Item>
                <Item>
                  <Input placeholder="Photo URL" />
                </Item>
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
