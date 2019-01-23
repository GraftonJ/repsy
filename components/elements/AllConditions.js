import React, { Component } from 'react';
import { FlatList, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { Text, List, ListItem } from 'native-base'

import store, { URI } from '../../store'
import { getConditions } from '../../utils/api'

export default class AllConditions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      conditions: [],
      filteredcond: []
    };
  }

  onValueChange(value: string) {
    this.setState({
      selected: value,
      conditions: this.state.conditions
    });
  }

  async componentDidMount(){
    console.log('******************component mounted')
    //get data from the API
    const response = await fetch(`${URI}/conditions`)
    const json = await getConditions()
    console.log(json)
    this.setState({conditions: json})
    console.log(json[0])
  }

  render() {
    console.log("fdsklfjsldk", this.state.conditions)
    return (
      <List>
        {this.state.conditions.map((condition, idx) => (
          <ListItem key={idx}>
            <TouchableOpacity>
              <Text>{condition.name}</Text>
            </TouchableOpacity>
          </ListItem>
        ))}
      </List>
    );
  }
}
