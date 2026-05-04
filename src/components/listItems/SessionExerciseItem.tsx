import {ExerciseSetUpdate, ISessionExercises} from "../../types/types.ts";
import {useState} from "react";
import {ChevronDownIcon} from "flowbite-react/icons/chevron-down-icon";
import SetItem from "./SetItem.tsx";
import useUpdateSet from "../../Hooks/useUpdateSet.ts";

interface SessionExerciseItemProps {
    exercise: ISessionExercises
}


/**
 * Creates a new exercise Item you can follow during your session.
 * @param param0
 * @param param0.exercise
 * @constructor
 */
export default function SessionExerciseItem({exercise}:SessionExerciseItemProps) {
    const [closed,isClosed] = useState(true);
    const chevronOpenStyle = closed ? "":"rotate-180";
    
    const exerciseSet = useUpdateSet();
    const handleUpdate = (update: ExerciseSetUpdate) => {
        console.log(update);
        exerciseSet.mutate(update);
    }

    const handleOpen = () => {
        isClosed(prev => !prev);
    }

    return <div className={"session-exercise-item w-full h-fit border border-bordercolor rounded flex flex-col cursor-default"}>
        <div className={"exercise-header flex flex-row gap-4 items-center justify-center w-full h-full pr-4"} onClick={handleOpen}>
            <div className="img-container w-fit">
                <img className={"h-24 w-24 object-cover rounded-l"} src={exercise.gif_url} alt="" loading={"lazy"} decoding={"async"}/>
            </div>
        <h2 className={"exercise-name text-textcolor text-lg font-semibold select-none flex-1"}>{exercise.name} </h2>
            <ChevronDownIcon className={`${chevronOpenStyle} text-4xl text-accent transition-all`}/>
        </div>
        {!closed ? <div className={"exercise-set-list flex flex-col h-full w-full flex-1 p-2 gap-4 border-t border-t-bordercolor"}>
            {exercise.sets.map((set,idx) => <SetItem key={exercise.exercise_id+idx} onChange={handleUpdate} set={set} exerciseId={exercise.exercise_id} setNr={idx}/>)}
        </div>:null}
    </div>
}


