import store from '../store';

const API = `https://repsy.herokuapp.com`


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
