import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Item, Icon, Input } from 'native-base'

import AllConditions from '../elements/AllConditions'
import Footermenu from '../elements/footermenu'

export default class ConditionsPage extends Component {

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
          <AllConditions/>
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
