import WorkoutCreatePage from "../pages/Workout/WorkoutCreatePage.tsx";
import WorkoutSelectionPage from "../pages/Workout/WorkoutSelectionPage.tsx";
import {Route, Routes} from "react-router-dom";
import WorkoutHistoryPage from "../pages/Workout/WorkoutHistoryPage.tsx";
import UseWorkoutCreation from "../Hooks/UseWorkoutCreation.ts";
import WorkoutExerciseSelectPage from "../pages/Workout/WorkoutExerciseSelectPage.tsx";

// These are routes used only in this file
const WORKOUT_ROUTES = {
    ROOT: '/',
    CREATE: '/create',
    HISTORY: '/history',
    EXERCISES: '/exercises'
} as const;

export default function WorkoutRouter() {
    const {saveWorkout,addExercise,updateWorkoutName, selectedExercises,getWorkoutName} = UseWorkoutCreation();

        return (
            <Routes>
                <Route path={WORKOUT_ROUTES.ROOT} element={<WorkoutSelectionPage/>} />
                <Route path={WORKOUT_ROUTES.CREATE} element={<WorkoutCreatePage saveWorkout={saveWorkout} updateWorkoutName={updateWorkoutName} selectedExercises={selectedExercises} workoutName={getWorkoutName()} />} />
                <Route path={WORKOUT_ROUTES.HISTORY} element={<WorkoutHistoryPage />} />
                <Route path={WORKOUT_ROUTES.EXERCISES} element={<WorkoutExerciseSelectPage addExercise={addExercise}/> }/>

            </Routes>
        );
}