import { useReducer } from "react";
import { Iworkout } from "../../context/WorkoutContext";

export enum ExercisesActionKind {
  SELECT = "SELECT",
  UNSELECT = "UNSELECT",
  ADD = "ADD",
}

export interface ExerciseAction {
  type: ExercisesActionKind;
  payload: Iworkout;
}

export interface ExerciseState {
  exercises: Iworkout[];
}

function reducer(state: ExerciseState, action: ExerciseAction): ExerciseState {
  const { type, payload } = action;
  console.log(state);

  switch (type) {
    case ExercisesActionKind.SELECT:
      return {
        ...state,
        exercises: [...state.exercises, payload],
      };

    case ExercisesActionKind.UNSELECT: {
      const index = state.exercises.findIndex((e) => e.id === payload.id);
      if (index === -1) return state;
      return {
        ...state,
        exercises: [
          ...state.exercises.slice(0, index),
          ...state.exercises.slice(index + 1),
        ],
      };
    }

    case ExercisesActionKind.ADD:
      return state;

    default:
      return state;
  }
}

export default function useExerciseSelectReducer() {
  const [state, dispatch] = useReducer(reducer, { exercises: [] });
  return { state, dispatch };
}