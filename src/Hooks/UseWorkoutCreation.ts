import {useState} from "react";
import {CreateWorkoutInput} from "../apis/workoutAPI.ts";
import API from "../classes/api.ts";
import logger from "../classes/logger.ts";

interface WorkoutCreationResponse{
    saveWorkout: () => void;
    addExercise: (exercise:ExerciseDTO) => void;
    updateWorkoutName: (_name: string) => void;
    selectedExercises: () => ExerciseDTO[];
    getWorkoutName: () => string;
}
export default function UseWorkoutCreation():WorkoutCreationResponse {
    const [newWorkout,setNewWorkout] = useState<CreateWorkoutInput>({name:"",desc:"",exercises:[]});

    const getWorkoutName = () => {
        return newWorkout.name;
    }

    const saveWorkout = () => {
        API.workouts.create(newWorkout);
    }
    const addExercise = (exercise:ExerciseDTO) => {
        logger.LogEvent("exercise added to workoutCreation",exercise);
        setNewWorkout(prev => ({
            ...prev,
            exercises: [...prev.exercises,exercise]
        }))
    };

    const updateWorkoutName = (_name: string) => {
        logger.LogEvent("updated workout creation name",_name);
        setNewWorkout(prev => ({
            ...prev,
            name: _name
        }));
    }

    const selectedExercises = () => {
        return newWorkout.exercises;
    }

    return {saveWorkout,addExercise,updateWorkoutName,selectedExercises,getWorkoutName}
}