// import React, { Component } from 'react';
// import { Platform, StyleSheet, View, Text, Dimensions, Picker } from 'react-native';
// import { Actions } from 'react-native-router-flux';
// import { Container, Header, Content, Footer, Button, Left, Right, Body, Form, Item, Input } from 'native-base'
//
// import store, { URI } from '../../store'
// import { getSpecialties } from '../../utils/api'
// const PickerItem = Picker.Item
//
// export default class SpecialtiesList extends Component{
//   constructor(props){
//     super(props)
//       this.state = {
//         specialties: []
//       }
//   }
//
//   async componentDidMount(){
//     console.log('******************component mounted')
//     //get data from the API
//     const response = await fetch(`${URI}/specialties`)
//     const json = await getSpecialties()
//     console.log(json)
//     this.setState({specialties: json})
//     console.log(json[0])
//   }
// }
//
// render() {
//   return(
//   <Form>
//     {this.state.specialties.map((specialty) => {
//       <PickerItem
//         />
//     })}
//   </Form>
//   )
// }
