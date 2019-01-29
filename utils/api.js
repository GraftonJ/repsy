import store from '../store';

const API = `https://repsy.herokuapp.com`
const CALENDAR_API = `https://api.timekit.io/v2`

/*On the page you want to make API call
need to import the function (ex: import { getSpecialties } from '../../utils/api')
then will want to do a ComponentDidMount utilizing the function

ex:
async componentDidMount(){
  console.log('******************component mounted')
  //get data from the API
  const response = await fetch(`${URI}/specialties`)
  const json = await getSpecialties()
  console.log(json)
  this.setState({specialties: json})
  console.log(json[0])
}
See RegistrationForm element for a working example
*/

//GET ALL SPECIALTIES
export const getSpecialties = async () => {
  const response = await fetch(`${API}/specialties`)
  const json = await response.json();
  return json
}

//GET ALL CONDITIONS
export const getConditions = async () => {
  const response = await fetch(`${API}/conditions`)
  const json = await response.json();
  return json
}

//GET ALL CONDITIONS_MEDS
export const getConditionsMeds = async () => {
  const response = await fetch(`${API}/conditions_meds`)
  const json = await response.json();
  return json
}

//GET ALL MEDS
export const getMeds = async () => {
  const response = await fetch(`${API}/meds`)
  const json = await response.json();
  return json
}

//GET ALL REPS
export const getReps = async () => {
  const response = await fetch(`${API}/reps`)
  const json = await response.json();
  return json
}

//GET ALL REPS_MEDS
export const getRepsMeds = async () => {
  const response = await fetch(`${API}/reps_meds`)
  const json = await response.json();
  return json
}

//GET conditions that a doctor has choosen to follow. id is the doctors id you want to find the conditions for and is pulled from the user state in the store
export const getDoctorsConditions = async () => {
  const response = await fetch(`${API}/doctors_Conditions/${store.getState().user.id}`)
  const json = await response.json();
  return json
}


//GET bookings that a doctor or rep has made
export const getBookings = async () => {
  try {
    timekit.configure({
      appKey: 'test_api_key_K6TsbABl5OYvMIQgFz2lmcMiKcGg5bwX',
      // Optional

      project_id: '077f4cb9-445c-47f9-b87a-8564d4720f68',   // Reference a project where you want to pull settings from and connect bookings to
      el: '#bookingjs', // Which element should we the library load into
      autoload: true, // Auto initialization if a windo.timekitBookingConfig variable is found
      debug: false, // Enable debugging mode to output useful state/step data in the console
      disable_confirm_page: false, // Disable the confirmation page and use the "clickTimeslot" callback to receive selected timeslot

      // Manual configuration (not needed when supplying project_id)

      resources: [],   // ID's of the resources that are available as par of this project
      availability: {
        mode: 'roundrobin_random',
        length: '30 minutes',
        from: '-1 hour',
        to: '4 weeks',
        buffer: '15 minutes',
        ignore_all_day_events: false
      }, // Configure how availability should be queried. (see below) 
      availability_constraints: [
        { allow_day_and_time: { day: 'monday', start: 9, end: 17 } },
        { allow_day_and_time: { day: 'tuesday', start: 9, end: 17 } }
      ], // Configure any cross-resource constraints. (see below)
      booking: {
        graph: 'instant', // what type of flow? instant confirms the booking immediately
        what: 'TBD',
        where: 'West End'
      }, // Configure how bookings should be made. (see below)
      reminders: [
        {
          type: 'email',
          settings: {
            recipient: 'owner',
            subject: 'REPSY Appointment in 15 mins!'
          },
          when: {
            type: 'before',
            unit: 'mins',
            time: 15
          }
        }
      ], // Reminder settings specific to this project. (see below)
      customer_fields: {
        name: {
          title: 'Full name',
          prefilled: false,
          readonly: false
        },
        email: {
          title: 'E-mail',
          prefilled: 'marty.mcfly@timekit.io',
          readonly: true
        },
        comment: {
          title: 'Comment',
          prefilled: false,
          required: true,
          readonly: false,
          format: 'textarea'
        },
        phone: {
          title: 'Phone number',
          prefilled: false,
          required: false,
          readonly: false,
          format: 'tel'
        },
        voip: {
          title: 'Skype username',
          prefilled: false,
          required: false,
          readonly: false
        },
        location: {
          title: 'Location',
          prefilled: false,
          required: false,
          readonly: false
        }
      }, // Configure which inputs the customer can add to the booking. (see below)
      ui: {
        display_name: 'Martys Timetravel Service',
        avatar: 'http://via.placeholder.com/100x100',
        availability_view: 'agendaWeek',
        timezone: null,
        show_credits: true,
        show_timezone_helper: true,
        time_date_format: '12h-mdy-sun',
        localization: {
          allocated_resource_prefix: 'for',
          submit_button: 'Book it now!',
          success_message: 'Thanks for booking!'
        }
      }, // UI specific configuration used by our booking.js widget (v2) reference coming.
      fullcalendar: {}, // Configure FullCalendar options. (see below)
      callbacks: {} // Register callbacks on events. (see below)
    })

    timekit.getResources()
      .then((res) => {
        console.log('getResources -> res.data', res.data)

        res.data.forEach(x => {
          let id = x.id
          timekit.getBookings({ id })
            .then((res) => {
              console.log('getBookings for Each Resource', res)
            }).catch((err) => {
              console.log('error', err)
            })
          timekit.getEvents({ id })
            .then((res) => {
              console.log('getEvents -> response', res)
            }).catch((err) => {
              console.log('error', err)
            })
        })
      }).catch((err) => {
        console.log('error', err)
      })



    timekit.getBookings()
      .then((res) => {
        console.log('getBookings -> response', res)
        return res
      }).catch((err) => {
        console.log('error', err)
      })

    // console.log('getResource', timekit.getResource( "72595f19-674f-46ab-9f77-eb34daf4bc68" ))
    // console.log('getResource', timekit.getEvent("72595f19-674f-46ab-9f77-eb34daf4bc68"))
  } catch (error) {
    console.log(error)
  }
}


//GET bookings that a doctor or rep has made
export const getABooking = async () => {
  try {
    timekit.configure({
      appKey: 'test_api_key_K6TsbABl5OYvMIQgFz2lmcMiKcGg5bwX',
      app: 'REPSY',
      resourceEmail: 'tarmstrong1327@gmail.com',
      resourceKey: '4cY2KWMggw95mAdx51eYUO2CyIWI2xup'
    })
    timekit.getBookings()
      .then((res) => {
        console.log('response!!!!!', res)
        return res
      }).catch((err) => {
        console.log('response', err)
      })
  } catch (err) {
    console.log(err)
  }
}
