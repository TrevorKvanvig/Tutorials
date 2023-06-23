import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout}) => { // from the props destructure and get entire workout passed
  const { dispatch } = useWorkoutsContext()

  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    
    if(response.ok) {
      dispatch({ // use dispach function to update state
        type: 'DELETE_WORKOUTS', payload: json
      })
    }
  }


  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Repititions:</strong> {workout.reps}</p>
      <p><strong>Weight (lbs):</strong> {workout.weight}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true}) }</p>
      <span onClick={handleClick} className="material-symbols-outlined">delete</span>
    </div>
  );
}

export default WorkoutDetails