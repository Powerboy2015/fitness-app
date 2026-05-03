import { useQuery } from "@tanstack/react-query";
import API from "../classes/api.ts";
import {IdetailedWorkoutDTO} from "../types/types.ts";

/**
 * Requests the details from a workout from the backend, based on the uuid of a workout.
 * @param workoutId The Uuid of a given workout
 * @returns workoutName,Desc and attached exercises.
 */
// export default function useDetailedWorkout(workoutId: string) {
//     const [detailedWorkout,setDetailedWorkout] = useState<null|IdetailedWorkoutDTO>(null);

//     useEffect(() => {
//         const getData = async () => {
//             const response = await API.workouts.detailed(workoutId);
//             if (typeof response === "string") {
//                 return;
//             }
//             setDetailedWorkout(response);
//         };

//         getData();
//     }, []);

//     return detailedWorkout;
// }

export default function useDetailedWorkout(workoutId: string) {
    return useQuery<IdetailedWorkoutDTO>({queryKey:["workout","detailed",workoutId],queryFn: async () => {
        return await API.workouts.detailed(workoutId);
    }})
}