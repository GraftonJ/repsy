/* store.js
   Simple app-wide data store (Redux-lite)
*/

// export const URI = "http://localhost:3000";
export const URI = "https://repsy.herokuapp.com"

let state = {

  //Dummy user state for other componenets to pull. Will need to set this state from user object on signin
  // user: {
  //   uid: 999999999,
  //   fname: 'Doctor',
  //   lname: 'Smith',
  //   id: 2,
  // },
  // isLoggedIn: true,
  // Logged in user set by Login
  // Null when user is not logged in
  /* { id: 2,
       name: "New User",
       email: "nuser@gmail.com",
       dogNames: ""Luna"",
       authHeader: "Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImxvZ2dlZEluIjp0cnVlLCJpYXQiOjE1NDUxNTYxMjMsImV4cCI6MTU0NTc2MDkyM30.xWToQs1ECfLF9wyKbs4uQTZnvzTFnrA4atKIRxU0bzI", // JWT from server to pass back in subsequebnt fetch's
     } */
     user: null,
  // convenience flag that is kept in sync with "user" key by Login
  isLoggedIn: false,

  //List of reps for a particular treatment. Default data type should be an array
  reps: [],

  //sets value of dropdown on registration form
  selectedSpecialty: '',
  selectedSpecialty_id: '',

  //med info for displaying a list of reps who are connected to that med. Dummy ID present to test the API call. id is med id.
  med_reps: {
    id: 1,
    generic_name: 'Ibuprofen',
    brand_name: 'Advil',
    company: 'Amgen',
  },

  // Gets the current information the user wants about the med
  desired_info: {
    med_id: null,
    pharma_company: '',
    condition_name: '',
    generic_name: '',
    brand_name: '',
    label: '',
    linkkey: '',
    repIdx: 0,
  },

  //Gets the conditions to list on the homepage
  doctorsConditions: [],

  //gets specified conditions from homepage
  addedCondition: null,
  selected: '',

  //Store all the bookings
  items: [],
  calendarBookings: {},
  calendarResources: []
};


let listeners = [];

export default {
  getState() {
    return state;
  },
  setState(newState) {
    state = { ...state, ...newState };
    console.log("---------------- store::setState ----------------------");
    console.log("Adding: ", newState);
    console.log("-------------------------------------");
    console.log("New store: ", state);
    console.log("-------------------------------------");
    console.log("Listener count: ", listeners.length);
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    listeners.forEach(listener => listener());
  },
  onChange(newListener) {
    listeners.push(newListener);
    // console.log("---------- store::AddListener ----------------------");
    // console.log("Listener count: ", listeners.length);
    // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    // returns function to remove listener from list
    return () => {
      listeners = listeners.filter(listener => listener !== newListener);
    }
    // ORIGINAL CODE DIDN'T REMOVE LISTENERS! return () => listeners.filter(listener => listener !== newListener);
  },
};
