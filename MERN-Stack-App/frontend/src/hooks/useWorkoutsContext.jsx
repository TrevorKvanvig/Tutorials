import { WorkoutsContext } from "../context/WorkOutContext";
import { useContext } from "react";


// allow to be imported and invoked in other files
export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext) // context stores value passed in workoutContext.jsx

  if(!context) {
    throw Error('use workout context must be used in workout context provider')
  }

  // context contatains context.currentStateOfObject and context.dispach
  return context
}