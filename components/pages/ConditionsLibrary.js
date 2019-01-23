import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Item, Icon, Input, Text, List, ListItem } from 'native-base'

import store, { URI } from '../../store'
import { getConditions } from '../../utils/api'

import Footermenu from '../elements/footermenu'

export default class ConditionsLibrary extends Component {

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

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search"  />
            <Icon name="medkit" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content>
          <List>
            {this.state.conditions.map((condition, idx) => (
              <ListItem key={idx}>
                <TouchableOpacity>
                  <Text>{condition.name}</Text>
                </TouchableOpacity>
              </ListItem>
            ))}
          </List>
        </Content>
        <Footer>
          <Footermenu/>
        </Footer>
      </Container>
    ) // End of return
  } // End of render

} // End of component





// filtering(searchString){
//   if(searchString !== ""){
//     const filteredcond = this.state.conditions.filter((condition)=>(condition.name.includes(searchString)))
//     if(filteredcond.length > 0){
//       this.setState({
//         ...this.state,
//         filteredRecipes: filteredRecipes,
//         searchVal: `Search: ${searchString}`
//       })
//       setTimeout(()=>this.scrollView.scrollTo({x: 0, y: 0, animated: true}), 1)
//     }else{
//       this.setState({
//         ...this.state,
//         filteredcond: this.state.versionFilter,
//         searchVal: 'Popular Recipes'
//       })
//       setTimeout(()=>this.scrollView.scrollTo({x: 0, y: 0, animated: true}), 1)
//       // add toast or notification of 'no results'
//       Toast.show({
//         text: 'No Results',
//         buttonText: 'Okay'
//       })
//     }
//   }else{
//     this.setState({
//       ...this.state,
//       filteredRecipes: this.state.versionFilter,
//       searchVal: 'Popular Recipes'
//     })
//     setTimeout(()=>this.scrollView.scrollTo({x: 0, y: 0, animated: true}), 1)
//     // add toast or notification of 'no results'
//     Toast.show({
//       text: 'No Results',
//       buttonText: 'Okay'
//     })
//   }
// }
