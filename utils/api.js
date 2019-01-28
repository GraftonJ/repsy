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
    const timekit = require('timekit-sdk')
    
    timekit.configure({
      appKey: 'test_api_key_K6TsbABl5OYvMIQgFz2lmcMiKcGg5bwX'
    })

    timekit.getBookings()
      .then(function (response) {
        console.log(response);
      }).catch(function (response) {
        console.log(response);
      })
    console.log('response', response)
    const json = await response.json()
    console.log('json', json)
    return json
    } catch (error) {
      console.log(error)
    }
}
