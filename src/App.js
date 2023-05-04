import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [showDone, setShowDone] = useState([])

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    console.log("addNewWorkout:", newWorkout)

    setWorkouts([...workouts, newWorkout])
  }

  const deleteWorkout = (workout) => {
    console.log("deleteWorkout:", workout)

    let filteredWorkouts = workouts.filter( item => {
      if( item !== workout){
        return workout
      }
    })
    setWorkouts(filteredWorkouts)
  }

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout)
    const completedWorkouts = workouts.map( item =>{
      if( item === workout){
        return {
          ...item,
          done: true
        }
      } else{
        return item
      }
    })
    setWorkouts(completedWorkouts)
  }

    const handleChange = (e) => {
     if(e.target.checked){
      setShowDone(workouts)
      const newWorkouts = workouts.filter(item => item.done === true)
      setWorkouts(newWorkouts)
     } else {
      setWorkouts(showDone)
     }
    }

  
return(
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <label htmlFor='toggleDone'>Show Done Only</label>
      <input type="checkbox" id="toggleDone" onChange={handleChange}/>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done && 
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done && 
             <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default App
