import {useEffect, useState} from "react";
import API from "../classes/api.ts";

export type IWorkoutModified = {
    id: string;
    name: string;
    desc?: string;
};

interface UseWorkoutResponse{
    workouts: IWorkoutModified[],
    reloadWorkouts: () => void
}

export default function UseWorkouts(): UseWorkoutResponse {
    const [workouts,setWorkouts] = useState<IWorkoutModified[]>([]);
    const getWorkouts = async () => {
        //beautifully wrapped API call.
        const workoutList = await API.workouts.list();
        // I have to remap the response because muks lib requires an ID
        const remappedWorkout: IWorkoutModified[] = workoutList.map((workout) => {
            return {
                id: workout.uuid,
                name: workout.name,
                desc: workout.desc,
            };
        });
        setWorkouts(remappedWorkout);
    };

    useEffect(() => {
        getWorkouts();
    },[]);

    return {workouts, reloadWorkouts: getWorkouts};
}