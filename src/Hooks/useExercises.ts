import {useQuery} from "@tanstack/react-query";
import API from "../classes/api.ts";

export default function useExercises(page:number) {
    return useQuery<ExerciseDTO[]>({queryKey:["exercises"],queryFn: async () =>{
        return await API.exercises.list({page,page_size:50});
        },})
}