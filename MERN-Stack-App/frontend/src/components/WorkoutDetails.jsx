const WorkoutDetails = ({workout}) => { // from the props destructure and get entire workout passed
  
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Repititions:</strong> {workout.reps}</p>
      <p><strong>Weight (lbs):</strong> {workout.weight}</p>
      <p>{workout.createdAt}</p>
    </div>
  );
}

export default WorkoutDetails