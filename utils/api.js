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
  const response = await fetch(`${API}/reps_meds/${store.getState().med_reps.id}`)
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
      // app: 'test-repsy-3078',
      appKey: 'test_api_key_K6TsbABl5OYvMIQgFz2lmcMiKcGg5bwX',
      // Optional
      project_id: '077f4cb9-445c-47f9-b87a-8564d4720f68', // Reference a project where you want to pull settings from and connect bookings to
      // el: '#bookingjs', // Which element should we the library load into
      autoload: true, // Auto initialization if a windo.timekitBookingConfig variable is found
      debug: true, // Enable debugging mode to output useful state/step data in the console
      disable_confirm_page: false, // Disable the confirmation page and use the "clickTimeslot" callback to receive selected timeslot
    })

    const res = await timekit.include('attributes').getBookings()
    let calenderData = {}
    const timeToString = (time) => {
      const date = new Date(time)
      return date.toISOString().split('T')[0]
    }
    res.data.forEach((x) => {
      let event = x.attributes.event
      const date = timeToString(event.start)

      // Cycles through and creates the objects for the timekit according
      // to the timekits desired format: {'Year-Month-Day': [{name: "Description"}]'}
      if (!calenderData[date]) {
        calenderData[date] = [{ name: `${event.what}` }]
      } else {
        calenderData[date].push({ name: `${event.what}` })
      }
    })
    store.setState({
      items: res.data,
      calender: calenderData
    })
  } catch (error) {
    console.log(error)
  }
}

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
