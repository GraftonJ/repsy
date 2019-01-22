/* store.js
   Simple app-wide data store (Redux-lite)
*/

export const URI = "https://repsy.herokuapp.com";

let state = {
specialties: [],

  // Logged in user set by Login
  // Null when user is not logged in
  /* { id: 2,
       name: "New User",
       email: "nuser@gmail.com",
       dogNames: ""Luna"",
       authHeader: "Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImxvZ2dlZEluIjp0cnVlLCJpYXQiOjE1NDUxNTYxMjMsImV4cCI6MTU0NTc2MDkyM30.xWToQs1ECfLF9wyKbs4uQTZnvzTFnrA4atKIRxU0bzI", // JWT from server to pass back in subsequebnt fetch's
     } */

  error: false,
}

// let listeners = [];
//
// export default {
//   getState() {
//     return state;
//   },
//   setState(newState) {
//     state = { ...state, ...newState };
//     console.log("---------------- store::setState ----------------------");
//     console.log("Adding: ", newState);
//     console.log("-------------------------------------");
//     console.log("New store: ", state);
//     console.log("-------------------------------------");
//     console.log("Listener count: ", listeners.length);
//     console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
//     listeners.forEach(listener => listener());
//   },
//   onChange(newListener) {
//     listeners.push(newListener);
//     // console.log("---------- store::AddListener ----------------------");
//     // console.log("Listener count: ", listeners.length);
//     // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
//     // returns function to remove listener from list
//     return () => {
//       listeners = listeners.filter(listener => listener !== newListener);
//     }
//     // ORIGINAL CODE DIDN'T REMOVE LISTENERS! return () => listeners.filter(listener => listener !== newListener);
//   },
// };
