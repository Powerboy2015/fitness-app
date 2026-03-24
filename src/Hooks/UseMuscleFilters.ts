import {useEffect, useMemo, useState} from "react";
import API from "../classes/api.ts";


interface ReturnProps{
    sortedExercises: ExerciseDTO[]
    setMuscle: (muscle:muscleGroups) => void
    muscleGroup: muscleGroups
}

// interface UseMuscleFilterProps {
// }

export type muscleGroups = "pectorals"|
    "biceps"|
    "triceps"|
    "lats"|
    "upper back"|
    "delts"|
    "forearms"|
    "abs"|
    "quads"|
    "hamstrings"|
    "glutes"|
    "calves"|
    null;

/**
 * Encapsulated version of Lars's filter function.
 * @constructor
 * @returns sortedExercises -- A list of exercises sorted according to the filter
 * @returns muscleGroup -- the currently selected muscle group, is require in order to highlight selected.
 * @returns setMucle -- a function to change the currently selected muscle. Passing the same muscle twice unsets it.
 */
export default function UseMuscleFilters(): ReturnProps {
    const [muscleGroup,setMuscleGroup] = useState<muscleGroups>(null);
    const [exercises,setExercises] = useState<ExerciseDTO[]>([]);

    // The default function to update muscles.
    const setMuscle = (muscle: muscleGroups) => {
        if (muscleGroup === muscle) {
            setMuscleGroup(null);
        } else setMuscleGroup(muscle);
    }

    // Fetch exercises once
    useEffect(() => {
        // TODO reimplement Lars's query filter. Currently temporary hold.
        API.exercises.list().then(setExercises);
    }, []);

    // Update sortedExercises when muscleGroup or exercises change
    const sortedExercises = useMemo(() => {
        if (!muscleGroup) return exercises;
        return exercises.filter(exercise => exercise.target_muscles.includes(muscleGroup));
    }, [muscleGroup, exercises]);

    return {sortedExercises, muscleGroup,setMuscle}
}