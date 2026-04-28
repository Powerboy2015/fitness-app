import { useQuery } from "@tanstack/react-query";
import API from "../classes/api";

export default function useWorkouts() {
    return useQuery<WorkoutDTO[]>({queryKey: ["workouts"], queryFn: async () =>{
        return await API.workouts.list();
    }});
}