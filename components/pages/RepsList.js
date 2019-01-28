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

import RepsCard from '../elements/RepsCard'

export default class RepsList extends Component {
  constructor(props) {
  super(props);
  this.state = {
    reps: store.getState().reps,
    //Local state
    error: false,
    isLoading: true,
  }
}

//Subscribe doctorsConditions state to the store to update on change
async componentDidMount(){
  this.unsubscribe = store.onChange(() => {
    this.setState({
      reps: store.getState().reps,
    })
  })
//Get the reps from the reps route
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
