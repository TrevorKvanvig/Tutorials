import { useEffect } from "react";

import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/workoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

function Home() {
  // decontruct what use workoutsContext retuns
  // workouts: current state of workouts array on site
  // dispach: function to use to manipulate state functionality is in WorkOutContext
  const {workouts, dispatch} = useWorkoutsContext(); // keep track of current state of workouts on site using hook created in use workoutsConxtext

  // use effect will fire whenever home is rendered
  useEffect(() => {
    
    const getWorkouts = async () => {
      const response = await fetch('/api/workouts') // send get request to our backend api will proxy to local host 4000 based on proxy added in package.json
      const workoutsInJSON = await response.json() //convert resonse from api into json  and place in variable

      if(!workoutsInJSON.ok){
        dispatch({ // use dispach function to update state
          type: 'SET_WORKOUTS', payload: workoutsInJSON
        })
      }

      getWorkouts(workoutsInJSON); // changes current state of workouts into array of json objects from api

    }

    
    getWorkouts() // call async function
    
  }, []); // empty array second parameter ensures it will only get called once

  


  return(
    <div className = "home">
      <div className="workouts">
        {workouts && workouts.map((workout) => { // if workouts is not null map all workouts
          return(
            <WorkoutDetails key={workout._id} workout={workout} />
          )
        })}
      
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home;
