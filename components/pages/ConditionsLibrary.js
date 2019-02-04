// React Native and Native modules for page
import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Item, Icon, Input, Text, List, ListItem, Spinner, StyleProvider } from 'native-base'

import getTheme from '../../native-base-theme/components'
import material from '../../native-base-theme/variables/material'
import platform from '../../native-base-theme/variables/platform'

// Accesses the store and api
import store, { URI } from '../../store'
import { getConditions } from '../../utils/api'

// Imports the footer navbar at the bottom
import FooterMenu from '../elements/FooterMenu'

export default class ConditionsLibrary extends Component {

  // * *********************************** * //
  constructor(props) {
    super(props);
    this.state = {
      desired_info: store.getState().desired_info,
      isLoading: true,
      conditions: []
    };
  }

  // * *********************************** * //
  async componentDidMount(){
    //get data from the API
    const response = await fetch(`${URI}/conditions`)
    const json = await getConditions()
    this.setState({conditions: json})
    this.unsubscribe = store.onChange(() => {
      this.setState({
        desired_info: store.getState().desired_info
      })
    })
    this.setState({
      isLoading: false,
    })
  }

  // * *********************************** * //
  onPressButton = (condition) => {
    console.log('onPressButton()');
    store.setState({
      desired_info: {
        ...store.getState().desired_info,
        condition_name: condition,
      }
    });
    Actions.ConditionsPage()
  }

  // * *********************************** * //
  componentWillUnmount(){
    //disconnect from store notifications
    this.unsubscribe()
  }

  // * *********************************** * //
  render() {
    //Show loading spinner if fetching data
    if(this.state.isLoading){
        return (
          <Spinner style={styles.spinner} color='red' />
        )
      }
    else {
    return (
      <StyleProvider style={getTheme(platform)}>
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
                <TouchableOpacity onPress={() => this.onPressButton(condition.name)}>
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
    </StyleProvider>
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


// Filtering for searchbar... will use later
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
