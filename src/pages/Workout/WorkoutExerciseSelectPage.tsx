import UseExerciseList from "../../Hooks/UseExerciseList.ts";
import {useMemo} from "react";
import ExerciseItem from "../../components/items/ExerciseItem.tsx";

interface WorkoutExerciseSelectPageProps {
    addExercise: (exercise:ExerciseDTO) => void;
}
export default function WorkoutExerciseSelectPage({addExercise}:WorkoutExerciseSelectPageProps): React.ReactElement {
    const {exercises} = UseExerciseList();

    const exerciseRows = useMemo(() => {
        return exercises.map(exercise => <ExerciseItem addable exercise={exercise} addExercise={addExercise}/>)
    },[exercises]);

    return <div>
    {/*    SearchBar*/}
    {/*    Filters*/}
    {/*    ResultsList*/}
        <div id={"Exercises"} className={"flex flex-col gap-2"}>
            {exerciseRows}
        </div>
    </div>
}

