import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions, InputText, Alert, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base'
import store, { URI } from '../../store'

export default class RepsCard extends Component {
  constructor(props) {
  super(props);
  }
  render() {
      const {reps, index} = this.props
      return (
            <List>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail
                    style={styles.image}
                    square
                    source={{ uri: `${reps[index].reps_photo}` }} />
                </Left>
                <Body>
                  <Text
                    style={styles.name}>{reps[index].fname} {reps[index].lname}</Text>
                  <Text
                    style={styles.text}>{reps[index].city}, {reps[index].state}</Text>
                  <Text
                    style={styles.text}
                    note
                    numberOfLines={1}>Company: {reps[index].company}</Text>
                </Body>
                <Right>
                  <Button transparent>
                  {/* On pressing view, take the index of the rep that was clicked and set that value in desired_info in the store. This value is then used with the 'reps' state to render the correct rep in the RepDetail componenet */}
                    <Text onPress={() => {
                      store.setState({
                        desired_info: {
                          ...store.getState().desired_info,
                          repIdx: index,
                        }
                      })
                      Actions.RepDetail() }}>
                      View
                      </Text>
                  </Button>
                </Right>
              </ListItem>
            </List>
      );
    }
}

const styles = StyleSheet.create({
  name: {
    letterSpacing: 1,
    color: 'rgb(96, 29, 16)',
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    marginBottom: 5,
  },
  text: {
    color: 'rgb(96, 29, 16)',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
  },
  image: {
    height: 90,
    width: 90,
  }
})
