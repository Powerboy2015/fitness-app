import { useReducer } from "react";
import { Iworkout } from "../../context/WorkoutContext";

export enum ExercisesActionKind {
  SELECT = 'SELECT',
  UNSELECT = 'UNSELECT',
  ADD = 'ADD'
}

export interface ExerciseAction {
  type: ExercisesActionKind;
  payload: Iworkout;
}

interface ExerciseState {
  exercises: Iworkout[];
}

function reducer(state: ExerciseState, action: ExerciseAction): ExerciseState {
  const { type, payload } = action;

  switch (type) {
      case ExercisesActionKind.SELECT:
        state.exercises.push(payload);
      return { ...state};

    case ExercisesActionKind.UNSELECT:
        state.exercises.filter((exercise) => exercise == payload);
      return { ...state };

    case ExercisesActionKind.ADD:
        return state;
    default:
      return state;
  }
}

export default function useExerciseSelectReducer() {
    const [state,dispatch] = useReducer(reducer,{exercises: []});
    return {state,dispatch}
}