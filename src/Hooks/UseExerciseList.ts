import { useEffect, useState } from "react";
import API from "../classes/api.ts";


interface ReturnProps{
    exercises: ExerciseDTO[],
    setMuscle: (muscle:muscleGroups) => void,
    muscleGroup: muscleGroups,
    setQuery: (query:string) => void,
    LoadNextPage: () => void,
}

// interface UseMuscleFilterProps {
// }

export type muscleGroups =
  | "pectorals"
  | "biceps"
  | "triceps"
  | "lats"
  | "upper back"
  | "delts"
  | "forearms"
  | "abs"
  | "quads"
  | "hamstrings"
  | "glutes"
  | "calves"
  | "cardiovascular system"
  | null;

/**
 * Encapsulated version of Lars's filter function.
 * @constructor
 * @returns sortedExercises -- A list of exercises sorted according to the filter
 * @returns muscleGroup -- the currently selected muscle group, is required in order to highlight selected.
 * @returns setMuscle -- a function to change the currently selected muscle. Passing the same muscle twice unsets it.
 */
export default function UseExerciseList(): ReturnProps {
    const [muscleGroup,setMuscleGroup] = useState<muscleGroups>(null);
    const [exercises,setExercises] = useState<ExerciseDTO[]>([]);
    const [searchQuery,setSearchQuery] = useState<string|undefined>(undefined);
    const [currentPage,setCurrentPage] = useState<number>(1);

  // The default function to update muscles.
  const setMuscle = (muscle: muscleGroups) => {
    if (muscleGroup === muscle) {
      setMuscleGroup(null);
    } else setMuscleGroup(muscle);
  };

    const setQuery = (query: string) => {
        setSearchQuery(query);
    }

    useEffect(() => {
        const fetchData = async () => {
                const data = await API.exercises.list({query:searchQuery,filter: muscleGroup,page_size: 50, page: 1});
                setExercises(data);
        };
        fetchData();
        setCurrentPage(1);
    }, [muscleGroup,searchQuery]);

    const LoadNextPage = () => {

        setCurrentPage(prev => prev + 1);

        const fetchData = async () => {
                const data = await API.exercises.list({query:searchQuery,filter: muscleGroup,page_size: 50, page: currentPage});
                setExercises(prev => {
                    const existingIds = new Set(prev.map(ex => ex.exercise_id));
                    const newExercises = data.filter(ex => !existingIds.has(ex.exercise_id));
                    return [...prev, ...newExercises];
                });
        };
        fetchData();
    }

    return {exercises, muscleGroup,setMuscle,setQuery,LoadNextPage}
}
