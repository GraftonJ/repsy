// React Native and Native modules for page
import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Left, Right, Title, Body, Content, Segment, Footer, Button, Item, Icon, Input, Text, List, ListItem, Spinner, Segements } from 'native-base'

// Accesses the store and api
import store, { URI } from '../../store'
import { getMeds } from '../../utils/api'

// Imports the footer navbar at the bottom
import FooterMenu from '../elements/FooterMenu'

export default class MedsLibrary extends Component {

  // * *********************************** * //
  constructor(props) {
    super(props);
    this.state = {
      desired_info: store.getState().desired_info,
      isLoading: true,
      meds: [],
      med_selected: true,
      medication_tab: true,
      generic_checker: true,
      brand_checker: false
    };
  }

  // * *********************************** * //
  async componentDidMount(){
    //get data from the API
    const response = await fetch(`${URI}/meds`)
    const json = await getMeds()
    this.setState({meds: json})
    this.unsubscribe = store.onChange(() => {
      this.setState({
        desired_info: store.getState().desired_info
      })
    })
    this.state.meds.sort(function(a, b){
      if(a.generic_name < b.generic_name) { return -1; }
      if(a.generic_name > b.generic_name) { return 1; }
      return 0;
    })
    this.setState({
      isLoading: false,
    })
  }

  // * *********************************** * //
  // Function that handels a button press of one of the drugs.  Passes that to the
  // desired_info object in the store.  Needs to keep condition name, so that is passed
  onPressButton = (genericName, brandName) => {
    console.log('onPressButton()');
    store.setState({
      desired_info: {
        condition_name: store.getState().desired_info.condition_name,
        generic_name: genericName,
        brand_name: brandName,
        label: store.getState().desired_info.label,
        linkkey: store.getState().desired_info.linkkey
      }
    });
    Actions.SelectedMedication()
  }

  // * *********************************** * //
  componentWillUnmount(){
    //disconnect from store notifications
    this.unsubscribe()
  }

  // * *********************************** * //
  tabSwitch = (bool) => {
    switch(bool) {
      case true:
        this.state.meds.sort(function(a, b){
          if(a.brand_name < b.brand_name) { return -1; }
          if(a.brand_name > b.brand_name) { return 1; }
          return 0;
        })
        this.setState({
          medication_tab: false,
          generic_checker: false,
          brand_checker: true
        })
        console.log("I called it false")
        break;
      case false:
        this.state.meds.sort(function(a, b){
          if(a.generic_name < b.generic_name) { return -1; }
          if(a.generic_name > b.generic_name) { return 1; }
          return 0;
        })
        this.setState({
          medication_tab: true,
          generic_checker: true,
          brand_checker: false
        })
        console.log("I called it true")
        break;
      }
    }

  // * *********************************** * //


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
      <Container>
        <Header searchBar rounded hasSegment>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search"  />
            <Icon name="medkit" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>

        <Segment>
          <Button first active={this.state.generic_checker} onPress={() => this.tabSwitch(false) }>
            <Text>Generic Name</Text>
          </Button>
          <Button last active={this.state.brand_checker} onPress={() => this.tabSwitch(true) }>
            <Text>Brand Name</Text>
          </Button>
        </Segment>

        <Content padder>
        {this.state.medication_tab ?
          <List>
            {this.state.meds.map((med, idx) => (
              <ListItem key={idx}>
                <TouchableOpacity onPress={() => this.onPressButton(med.generic_name, med.brand_name)}>
                  <Text>{med.generic_name}</Text>
                </TouchableOpacity>
              </ListItem>
            ))}
          </List>
          :
          <List>
            {this.state.meds.map((med, idx) => (
              <ListItem key={idx}>
                <TouchableOpacity onPress={() => this.onPressButton(med.generic_name, med.brand_name)}>
                  <Text>{med.brand_name}</Text>
                </TouchableOpacity>
              </ListItem>
            ))}
          </List>
        }

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
