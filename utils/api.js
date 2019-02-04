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

    const getResources = await timekit.getResources()
    let resources = getResources.data

    const getBookings = await timekit.include('attributes').getBookings()
    let calendarData = {}


    // const getSingleBooking = await timekit.include('attributes').getBooking('49e76801-613a-46c2-9a27-a71262a951b2')
    // console.log('getSingleBooking', getSingleBooking)
    // timekit.deleteBooking('49e76801-613a-46c2-9a27-a71262a951b2')



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

// // GET resources
// export const createNewBookingRequest1 = async () => {

// }




// createNewBookingRequest = async () => {
//   console.log("Dummy Request Was Hit")
//   try {
//     timekit.configure({
//       // app: 'test-repsy-3078',
//       appKey: 'test_api_key_K6TsbABl5OYvMIQgFz2lmcMiKcGg5bwX',
//       // Optional
//       project_id: '077f4cb9-445c-47f9-b87a-8564d4720f68', // Reference a project where you want to pull settings from and connect bookings to
//       // el: '#bookingjs', // Which element should we the library load into
//       autoload: true, // Auto initialization if a windo.timekitBookingConfig variable is found
//       debug: true, // Enable debugging mode to output useful state/step data in the console
//       disable_confirm_page: false, // Disable the confirmation page and use the "clickTimeslot" callback to receive selected timeslot
//     })
//     timekit.createBooking({
//       resource_id: 'e4b663d4-8ea8-44ab-8685-dfbf5cf4b699',
//       graph: 'confirm_decline',
//       start: '2019-10-10T21:30:00-06:00',
//       end: '2019-10-10T22:15:00-07:00',
//       what: 'Tim Made A BOOKING... this is the WHAT field',
//       where: 'Courthouse, Hill Valley, CA 95420, USA',
//       description: 'Tim made a booking... this is the descrip field',
//       customer: {
//         name: 'Jimbo Martins',
//         email: 'tarmstrong1327@gmail.com',
//         phone: '(916) 555-4385',
//         voip: 'McFly',
//         timezone: 'America/Los_Angeles'
//       }
//     }).then(function (response) {
//       console.log("WORKED +++> ", response);
//     }).catch(function (response) {
//       console.log("DIED +++> ", response);
//     });
//   } catch (error) {
//     console.log(error)
//   }
// }


// // GET resources
// export const getResources = async () => {
//   const getResources = await timekit.getResources()
//   let resources = getResources.data
//   return resources
// }











// //GET bookings that a doctor or rep has made
// export const getABooking = async () => {
//   try {
//     timekit.configure({
//       appKey: 'test_api_key_K6TsbABl5OYvMIQgFz2lmcMiKcGg5bwX',
//       app: 'REPSY',
//       resourceEmail: 'tarmstrong1327@gmail.com',
//       resourceKey: '4cY2KWMggw95mAdx51eYUO2CyIWI2xup'
//     })
//     timekit.getBookings()
//       .then((res) => {
//         console.log('response!!!!!', res)
//         return res
//       }).catch((err) => {
//         console.log('response', err)
//       })
//   } catch (err) {
//     console.log(err)
//   }
// }


// // GET all Bookings for calendar from Timekit.io
    // // first get all bookable resources for REPSY
    // timekit.getResources()
    //   .then((res) => {
    //     let allBookings
    //     console.log('getResources -> res.data', res.data)
    //     res.data.forEach(x => {
    //       let id = x.id
    //       // GET appointment requests for each bookable resource
    //       timekit.getBookings({ id })
    //         .then((res) => {
    //           console.log('getBookings for Each Resource', res.data)
    //           let date = res.data

    //         }).catch((err) => {
    //           console.log('error', err)
    //         })
    //     })
    //   }).catch((err) => {
    //     console.log('error', err)
    //   })

    // console.log('getResource', timekit.getResource( "72595f19-674f-46ab-9f77-eb34daf4bc68" ))
    // console.log('getResource', timekit.getEvent("72595f19-674f-46ab-9f77-eb34daf4bc68"))



// `curl--request PUT \
// --url https://api.timekit.io/v2/bookings/49e76801-613a-46c2-9a27-a71262a951b2/confirm \
// --header 'Content-Type: application/json' \
// --user : test_api_key_K6TsbABl5OYvMIQgFz2lmcMiKcGg5bwX \
// --datat '{}'