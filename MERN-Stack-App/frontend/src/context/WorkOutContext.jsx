import { createContext, useReducer } from "react";

//TO CREATE GLOBAL STATE CONTEXT
//1. use createContext() function to create a new context

// WorkoutsContextProvider FUNCTION
//2. provide context to application component tree (allow certain compnents access by wrapping in index.js)
//   - this is done by creating WorkoutsContextProvider component and wrapping <App /> in index.js to allow 
//     all components in the <App /> tree to use the context functionality

// useReducer() REACT FUNCTION provides similar functionality of useState() but allows more to be done
//3. create functionality to update state 

// 4. create function that is called when dispacher is used

// 5. pass state and dispacher function into WorkoutsContext.Provider wrapper returned to allow other files in comonent tree to use functionality

// 6. use useContex() to get functionality passed in as values from previous step
//    this fucntionality is created in useWorkoutsContext.jsx

// 7. in in any component wrapped in workouts context it can be used by importing useWorkoutsContext()
// and doing this

// decontruct what use workoutsContext retuns
// workouts: current state of workouts array on site
// dispach: function to use to manipulate state functionality is in WorkOutContext
//const {workouts, dispatch} = useWorkoutsContext(); // keep track of current state of workouts on site using hook created in use workoutsConxtext



export const WorkoutsContext = createContext() // create a new context and call it WorkoutsContext this will be exportable and be allowed to be used in useWorkoutContext.jsx

//dispatch({type: 'SET_WORKOUTS', payload: what you want to pass into the function})
//when dispach is used in other files that is how it is set up
// dispach function invokes workoutsReducer function passing it the state and and action
//currentStateOfObject: is ehat is currently in the workouts array
//action: can be used to acess type and payload from dispatch call
export const workoutsReducer = (currentStateOfObject, action) => {
  // see what is passed as action type and determine what to do with state
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { // sets workouts key to array of all current workouts in database when dispach is called from home.js with SET_WORKOUTS as action type
        workouts: action.payload
      }
    case 'CREATE_WORKOUT':
      return { // add workout passed after it gets created in data base as the first workout in workouts array ahead of all previous workouts
        workouts: [action.payload, ...currentStateOfObject.workouts]
      }
    default: // if none match return state unchanged
      return currentStateOfObject
  }
}


export const WorkoutsContextProvider = ({children}) => { // children represents deconstruction of props of what is wrapped inside in this case children is <App />


  // STEP 3 keeps track of changes of state and allows functionality of changes
  // currentStateOfObject: value that can be used to recieve array of workouts in current state of app
  // dispatch: a function used to update state of currentStateOfObject
  // workoutsReducer: function name that calls function created above to manage state
  // workouts: an object with a workouts property initialized to null this is used as original value for state
  const [currentStateOfObject, dispatch] = useReducer(workoutsReducer, { 
    workouts: null
  })

  // return template to wrap <App />
  // uses contex we created in step 1 using provider functionality to allow objects inside to use functionality
  // VALUE= 
  // ...currentStateOfObject: allows other files with the context imported to access entire array of workouts in current state
  //                          spread operator spreads out all objects in current state so workouts can be accessed without currentStateOfObject.workouts
  // dispatch: allows other files with imported context to use the dispach function that will call workoutsReducer() and pass in values
  return (
    <WorkoutsContext.Provider value={{...currentStateOfObject, dispatch}}>
      {children}
    </WorkoutsContext.Provider>
  )
}





