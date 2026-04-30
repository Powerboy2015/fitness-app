import WorkoutExerciseItem from "../../components/listItems/WorkoutExerciseItem.tsx";
import PrimaryButton from "../../components/ui/buttons/PrimaryButton.tsx";
import {Link, useOutletContext} from "react-router-dom";
import {ROUTES} from "../../types/consts.ts";
import {WorkoutOutletContext} from "../../components/routers/WorkoutRoutes.tsx";
import {ChangeEvent} from "react";

export default function CreateWorkoutPage() {
  // We pull the usestate stuff form the context given to us by the outlet
  // https://reactrouter.com/api/hooks/useOutletContext
  const {tempWorkout,setTempWorkout} = useOutletContext<WorkoutOutletContext>();


  // takes all the previous values of the temp-workout and then changes name.
  const handleNameChange = (e:ChangeEvent<HTMLInputElement>) => {
    setTempWorkout(prev => {
      return {...prev,name: e.target.value}
    })
  }

  return (
    <div className="overflow-y-auto min-h-full flex flex-col p-4">
      <input
        id={"workout-name"}
        type="text"
        placeholder="Workout Name"
        defaultValue={tempWorkout.name}
        onChange={handleNameChange}

        className="border p-2 rounded text-textcolor bg-components border-accent w-full flex"
      />

      <section id={"selected-exercises"} className="mt-4 w-full h-full flex-1 flex flex-col">
        <h2 className="font-bold text-textcolor text-center justify-center mb-2 border-b-2 border-bordercolor w-full flex mx-auto">
          Selected Exercises:
        </h2>
        <ul id={"selected-exercises-list"} className="text-center flex-1 w-full h-full py-2">
          {tempWorkout.exercises.map((exercise) => {
            return (
                <WorkoutExerciseItem
                    // id={exercise.id}
                    key={exercise.id}
                    name={exercise.name}
                    gif={exercise.gif}
                    // index={1}
                    exerciseId={"test"}
                />
            );
          })}
        </ul>
        <PrimaryButton>
          <Link className={"w-full h-full py-4"} to={ROUTES.EXERCISES}>Select Exercises</Link>
        </PrimaryButton>
      </section>
    </div>
  );
}
