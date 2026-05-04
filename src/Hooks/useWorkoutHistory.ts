import {useQuery} from "@tanstack/react-query";
import API from "../classes/api.ts";
import {IworkoutHistory} from "../types/types.ts";

export default function useWorkoutHistory() {
    return useQuery<IworkoutHistory[]>({queryKey:["workout","history"], queryFn: API.workouts.history})
}