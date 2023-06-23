import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()

  const [newWorkoutDetails, setWorkoutDetails] = useState({
    title: '',
    reps: '',
    weight: ''
  });

  const [error, setError] = useState(null)

  function handleChange(event){
    const {name, value} = event.target;
    if(name === "title"){
      setWorkoutDetails(currentDetails => ({
        ...currentDetails,
        [name]: value
      }))
    }else if (name === "reps" || name === "weight"){
      const numVal = Number(value)
      
      setWorkoutDetails(currentDetails => ({
        ...currentDetails,
        [name]: numVal
      }))
    }
    
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(newWorkoutDetails),
      headers: {
        "Content-Type": 'application/json'
      }
    });
    const json = await response.json()

    if(!response.ok) {
      setError(json.error)

    } else if(response.ok){
      setWorkoutDetails(() => ({title: '',
      reps: '',
      weight: ''}))

      setError(null)
      console.log('new workout added');
      
      dispatch({type: 'CREATE_WORKOUT', payload: json}) // use dispach function to update state
    }
  }

  return (
    <form className="create">
      <h3>Add New Workout</h3>

      <label>Exercise Title</label>
      <input type='text' 
      onChange={handleChange} 
      name="title" 
      value={newWorkoutDetails.title} />

      <label>Repititions</label>
      <input type='text' 
      onChange={handleChange} 
      name="reps" 
      value={newWorkoutDetails.reps} />

      <label>Weight</label>
      <input type='text' 
      onChange={handleChange} 
      name="weight" 
      value={newWorkoutDetails.weight} />

      <button 
      onClick={handleSubmit}>Add Workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
}

export default WorkoutForm