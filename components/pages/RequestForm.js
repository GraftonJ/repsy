import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { getBookings } from '../../utils/api'
import store, { URI } from '../../store'
import timekit from 'timekit-sdk'
import moment from 'moment'

import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Button,
    DatePickerIOS
} from 'react-native'
import {
    Content,
    Form,
    Item,
    Input,
    Label,
    Icon,
    Textarea,
    StyleProvider
} from 'native-base'


export default class RequestsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: store.getState().user,
            chosenDate: new Date(),
            bookingRequest: {
                resource_id: 'e4b663d4-8ea8-44ab-8685-dfbf5cf4b699',
                graph: 'confirm_decline',
                start: '',
                end: '',
                what: 'NEW BOOKING',
                where: 'Courthouse, Hill Valley, CA 95420, USA',
                description: 'New booking TEST',
                customer: {
                    name: 'Jimbo Martins',
                    email: 'tarmstrong1327@gmail.com',
                    phone: '(916) 555-4385',
                    voip: 'McFly',
                    timezone: 'America/Los_Angeles'
                }
            }
        }
        this.setDate = this.setDate.bind(this)
    }

    componentDidMount() {
        this.unsubscribe = store.onChange(() => {
            this.setState({
                user: store.getState().user.id,
            })
        })

        store.setState({
            user: store.getState().user.id,
        })
    }

    componentWillUnmount() {
        //disconnect from store notifications
        this.unsubscribe()
    }
    render() {
        const {
            chosenDate,
            user
        } = this.state

        return (
            <Content>
                <Form>
                    <Item picker>
                        <Label>Pharma Rep:</Label>
                    </Item>
                    <Item>
                        <Icon active name='ios-call' />
                        <Input placeholder='Contact Number' />
                    </Item>
                    <Item stackedLabel>
                        <Label>Reason For Appointment</Label>
                        <Textarea rowSpan={5} width={340} bordered onChange={this.setReason.bind(this)} />
                    </Item>
                    <Item>
                        <View style={styles.container}>
                            <Label>Appointment Time/Date (MST)</Label>
                            <DatePickerIOS
                                date={chosenDate}
                                onDateChange={this.setDate}
                                minuteInterval={15}
                            />
                        </View>
                        {console.log('chosenDate', chosenDate)}
                        {console.log('this.state', this.state)}
                    </Item>
                </Form>
            </Content>
        ) // End of return
    } // End of render

    // View Calendar onClick function with updated Booking Requests
    viewAppointments = () => {
        this.setState({
            isLookingForAppointment: false,
        })
        getBookings()
    }

    // Set Current Date to State from Request Booking Form
    setDate(newDate) {
        console.log('this.state', this.state)
        this.setState({
            chosenDate: newDate,
            bookingRequest: {
                ...this.state.bookingRequest,
                start: moment(newDate).format(),
                end: moment(newDate).add(1, 'hour').format()
            }
        })
    }

    setReason(string) {
        console.log('string', string.target)
        this.setState({
            bookingRequest: {
                ...this.state.bookingRequest,
                what: string,
            }
        })
    }


    // Create a new Booking Request to desired Resource
    createNewBookingRequest = async () => {
        try {
            // timekit.updateBooking({ id:'b53f8655-b52e-43b6-a811-e5e3b694866e', action: "confirm"})
            timekit.createBooking(
                this.state.bookingRequest
            ).then(function (response) {
                console.log("WORKED +++> ", response);
            }).catch(function (response) {
                console.log("DIED +++> ", response);
            })
        } catch (error) {
            console.log(error)
        }

        viewAppointments()
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    button: {
        color: 'red',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    }
})
