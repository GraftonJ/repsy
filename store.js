/* store.js
   Simple app-wide data store (Redux-lite)
*/

// export const URI = "http://localhost:3000";
export const URI = "https://repsy.herokuapp.com"

let state = {

  //Dummy user state for other componenets to pull. Will need to set this state from user object on signin
  user: {
    uid: 999999999,
    fname: 'Doctor',
    lname: 'Smith',
    id: 2,
  },


  //Default State is blank array. Pulled in from getDoctorsConditions API called. Used to render data on the homepage to show the conditions doctors are saving
  doctorsConditions: [],

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
