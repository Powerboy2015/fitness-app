import { useQuery } from "@tanstack/react-query";
import API from "../classes/api";
import {WorkoutDTO} from "../types/types.ts";

export default function useWorkouts() {
    return useQuery<WorkoutDTO[]>({queryKey: ["workouts"], queryFn: async () =>{
        return await API.workouts.list();
    }});
}