import { ActionDispatch, ReactElement, ReactNode, useEffect, useState } from "react";
import { Iworkout, useWorkout } from "../context/WorkoutContext"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from "react-router-dom";
import useExerciseSelectReducer, { ExerciseAction, ExercisesActionKind } from "../Hooks/reducers/exerciseSelectReducer";

export default function SelectedExerciseModal() {

    const {exercises} = useWorkout();
    const [exerciseRows,setExerciseRows] = useState<ReactNode[]>([]);
    const {state,dispatch} = useExerciseSelectReducer();
    const navigate = useNavigate();

    const exerciseCount = exercises.length;

    useEffect(() =>{
        const rows = state.exercises.map((exercise) => 
            <ExerciseRow exercise={exercise} 
                         dispatcher={dispatch}
            />);

        setExerciseRows(rows);
    },[exercises]);

    return <div className="absolute z-100 bottom-20 left-[2dvw] w-[96dvw]">
        <ul className={`px-2 pt-2 mx-4 bg-[#F17F41] flex gap-2 flex-col rounded-t-2xl overflow-scroll max-h-30 ${exerciseRows.length == 0 ? "hidden":""}`}>
            {exerciseRows}
        </ul>
        <div className="bg-[#F67631] flex justify-between px-8 rounded-xl items-center border border-[#DC6728]">
            <p className="text-2xl">{exerciseCount} exercise{exerciseCount == 1 ? "" : "s"} added</p>
            <button className="text-4xl" onClick={() => {
                navigate(-1);    
            }}>Add</button>
        </div>
    </div>
}


type exerciseRowProps = {
    exercise: Iworkout;
    dispatcher: ActionDispatch<[action: ExerciseAction]>
}

function ExerciseRow({exercise,dispatcher}: exerciseRowProps): ReactNode {
    return <>
    <li className="flex items-center justify-between" key={exercise.id}>
            <p className="text-2xl">{exercise.name}</p>
            <div className="randomIconWrapperLOL" onClick={() => {
                dispatcher({
                    type: ExercisesActionKind.UNSELECT,
                    payload: exercise});
                }}>
            <DeleteOutlineIcon style={{fontSize: 32}}/>
            </div>
        </li>
    </>;

}