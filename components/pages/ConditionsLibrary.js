import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Item, Icon, Input, Text, List, ListItem, Spinner } from 'native-base'

import store, { URI } from '../../store'
import { getConditions } from '../../utils/api'

import FooterMenu from '../elements/FooterMenu'

export default class ConditionsLibrary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      isLoading: true,
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
    this.setState({
      isLoading: false,
    })
  }

  render() {
    //Show loading spinner if fetching data
    if(this.state.isLoading){
        return (
          <Spinner style={styles.spinner} color='red' />
        )
      }
    else {
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
          <FooterMenu/>
        </Footer>
      </Container>
    ) // End of return
  } // End of render
}
} // End of component

// Variables to changes the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

// Put styles in here to format the page
const styles = StyleSheet.create({
    spinner: {
      height: height
    }
});



// filtering(searchString){
//   if(searchString !== ""){
//     const filteredcond = this.state.conditions.filter((condition)=>(condition.name.includes(searchString)))
//     if(filteredcond.length > 0){
//       this.setState({
//         ...this.state,
//         filteredRecipes: filteredcond,
//         searchVal: `Search: ${searchString}`
//       })
//       setTimeout(()=>this.scrollView.scrollTo({x: 0, y: 0, animated: true}), 1)
//     }else{
//       this.setState({
//         ...this.state,
//         filteredcond: this.state.versionFilter,
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
//     })
//     setTimeout(()=>this.scrollView.scrollTo({x: 0, y: 0, animated: true}), 1)
//     // add toast or notification of 'no results'
//     Toast.show({
//       text: 'No Results',
//       buttonText: 'Okay'
//     })
//   }
// }
