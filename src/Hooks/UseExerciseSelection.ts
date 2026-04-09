import { useReducer, useState } from "react";
import useExerciseSelectReducer from "./reducers/exerciseSelectReducer";

interface UseExerciseSelectionProps {
    addFunc: () => void;
}


export default function UseExerciseSelection({addFunc}:UseExerciseSelectionProps): UseExerciseSelectionResponse {
    const {state,dispatch} = useExerciseSelectReducer();

    return {
        exercises: selectedExs
    }
}

