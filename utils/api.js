import store from '../store';

const API = `https://repsy.herokuapp.com`

export const getSpecialties = async () => {
  console.log("api::getSpecialties() in the api.js ");
  const response = await fetch(`${API}/specialties`);
  const json = await response.json();
  return json
}



// const getMeds = async () => {
//   const response = await fetch(`${URI}/meds`)
//   const json = await response.json()
//   return json
// }
//
//
// async componentDidMount(){
//   console.log('component mounted')
//   //get data from the API
//   const response = await fetch(`${URI}/meds`)
//   const json = await getMeds()
//   console.log(json)
//   this.setState({meds: json})
// }
