import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions, InputText, Alert, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button, Icon } from 'native-base'
import store, { URI } from '../../store'

export default class RepsCard extends Component {
  constructor(props) {
  super(props);
  }
  render() {
      const {reps, index} = this.props
      return (
            <List>
              <ListItem
                onPress={() => {
                  store.setState({
                    desired_info: {
                      ...store.getState().desired_info,
                      repIdx: index,
                    }
                  })
                  Actions.RepDetail() }}
                thumbnail>
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
                  <Button
                    onPress={() => {
                      store.setState({
                        desired_info: {
                          ...store.getState().desired_info,
                          repIdx: index,
                        }
                      })
                      Actions.RepDetail() }}
                    transparent
                  >
                    <Icon name="arrow-forward" style={{ color: "rgb(84, 157, 191)" }}/>
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
    fontFamily: 'Helvetica',
    marginBottom: 5,
  },
  image: {
    height: 90,
    width: 90,
  }
})
