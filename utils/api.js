import timekit from 'timekit-sdk'
import store from '../store'

const API = `https://repsy.herokuapp.com`
const CALENDAR_API = `https://api.timekit.io/v2`

/* On the page you want to make API call
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

// GET ALL SPECIALTIES
export const getSpecialties = async () => {
  const response = await fetch(`${API}/specialties`)
  const json = await response.json();
  return json
}

// GET ALL CONDITIONS
export const getConditions = async () => {
  const response = await fetch(`${API}/conditions`)
  const json = await response.json();
  return json
}

// GET ALL CONDITIONS_MEDS
export const getConditionsMeds = async () => {
  const response = await fetch(`${API}/conditions_meds`)
  const json = await response.json();
  return json
}

// GET ALL MEDS
export const getMeds = async () => {
  const response = await fetch(`${API}/meds`)
  const json = await response.json();
  return json
}

// GET ALL REPS
export const getReps = async () => {
  const response = await fetch(`${API}/reps`)
  const json = await response.json();
  return json
}

// GET ALL REPS_MEDS
export const getAllRepsMeds = async () => {
  const response = await fetch(`${API}/reps_meds`)
  const json = await response.json();
  return json
}

// GET all reps for a particular med id
export const getRepsMed = async () => {
  const response = await fetch(`${API}/reps_meds/${store.getState().desired_info.med_id}`)
  const json = await response.json();
  return json
}

// GET conditions that a doctor has choosen to follow. id is the doctors id you want to find the conditions for and is pulled from the user state in the store
export const getDoctorsConditions = async () => {
  const response = await fetch(`${API}/doctors_Conditions/${store.getState().user.id}`)
  const json = await response.json();
  return json
}

// GET all bookings that a doctor or rep has made
export const getBookings = async () => {
  try {
    timekit.configure({
      // app: 'test-repsy-9311',
      // appKey: 'test_api_key_PX7kbsihWFfheH3CXbqlTycJazLsZEI2', // REPSYscheduling@gmail.com
      appKey: 'test_api_key_K6TsbABl5OYvMIQgFz2lmcMiKcGg5bwX', //Tarmstrong1327@gmail.com
      // Optional
      // project_id: '990a0b41-9ec1-4549-81fc-e82ae3403fc5', // REPSYscheduling@gmail.com
      project_id: '077f4cb9-445c-47f9-b87a-8564d4720f68', //Tarmstrong1327@gmail.com
      // el: '#bookingjs', // Which element should we the library load into
      autoload: true, // Auto initialization if a windo.timekitBookingConfig variable is found
      debug: true, // Enable debugging mode to output useful state/step data in the console
      disable_confirm_page: false, // Disable the confirmation page and use the "clickTimeslot" callback to receive selected timeslot
    })

    // GET all Resources available
    const getResources = await timekit.getResources()
    let resources = getResources.data
    
    // GET all Bookings from Timekit.IO to populate calendar
    const getBookings = await timekit.include('attributes').getBookings()
    let calendarData = {}

    // Convert time and date to YYYY-MM-DD format
    const timeToString = (time) => {
      const date = new Date(time)
      return date.toISOString().split('T')[0]
    }
    console.log('getBookings', getBookings)
    getBookings.data.forEach((x) => {
      // console.log('x', x)
      let event = x.attributes.event
      let customer = x.attributes.customer
      // console.log('event', event)
      const date = timeToString(event.start)

      // Cycles through and creates the objects for the timekit according
      // to the timekits desired format: {'Year-Month-Day': [{name: "Description"}]'}
      if (!calendarData[date]) {
        calendarData[date] = [{ event_name: `${event.what}`, event_location: `${event.where}`, event_start: `${event.start}`, event_end: `${event.end}`, state: `${x.state}`, booking_id: `${x.id}`, customer_email: `${customer.email}`, customer_name: `${customer.name}` }]
      } else {
        calendarData[date].push({ event_name: `${event.what}`, event_location: `${event.where}`, event_start: `${event.start}`, event_end: `${event.end}`, state: `${x.state}`, booking_id: `${x.id}`, customer_email: `${customer.email}`, customer_name: `${customer.name}` })
      }
    })

    store.setState({
      items: getBookings.data,
      calendarBookings: calendarData,
      calendarResources: resources
    })
  } catch (error) {
    console.log(error)
  }
}