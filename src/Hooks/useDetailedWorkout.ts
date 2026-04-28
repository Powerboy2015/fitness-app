import API from "../classes/api.ts";
import {useEffect, useState} from "react";

export default function useDetailedWorkout(workoutId: string) {
    const [detailedWorkout,setDetailedWorkout] = useState<null|IdetailedWorkoutDTO>(null);

    useEffect(() => {
        const getData = async () => {
            const response = await API.workouts.detailed(workoutId);
            if (typeof response === "string") {
                return;
            }
            setDetailedWorkout(response);
        };

        getData();
    }, []);

    return detailedWorkout;
}