import FitInput from "../../components/ui/FitInput.tsx";
import ClickButton from "../../components/ui/ClickButton.tsx";
import AltLinkButton from "../../components/ui/AltLinkButton.tsx";
import {ROUTES} from "../../router/routes.ts";
import {useMemo} from "react";
import ExerciseItem from "../../components/items/ExerciseItem.tsx";

interface WorkoutCreatePage {
    saveWorkout: () => void;
    updateWorkoutName: (_name:string) => void;
    selectedExercises: () => ExerciseDTO[];
    workoutName: string;
}
export default function WorkoutCreatePage({saveWorkout,updateWorkoutName,selectedExercises,workoutName}: WorkoutCreatePage) {

    const mappedExercises = useMemo(() => {
        return selectedExercises().map(exercise => <ExerciseItem exercise={exercise}/>)
    },[]);

    return <div id={"workout-creation"} className={"flex flex-col w-full h-full gap-4"}>
        <FitInput type={"text"} placeholder={"workout name..."} defaultValue={workoutName} onChange={e => updateWorkoutName(e.target.value)} />
        <div id={"selected-exercises"} className={"w-full h-full flex flex-col gap-4 flex-1 overflow-y-scroll no-scrollbar"}>
            {mappedExercises}
        </div>
        <AltLinkButton to={ROUTES.WORKOUT_EXERCISES}>Select Exercises</AltLinkButton>
        <ClickButton id={"create-workout-button"} onClick={saveWorkout}>Save workout</ClickButton>
    </div>
}