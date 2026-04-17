import {useNavigate} from "react-router-dom";
import ComponentContainer from "../ui/ComponentContainer.tsx";
import {Add} from "@mui/icons-material";
import {ROUTES} from "../../router/routes.ts";

interface ExerciseItemProps {
    exercise: ExerciseDTO;
    addExercise?: (exercise:ExerciseDTO) => void;
    addable? : true;
}
export default function ExerciseItem({exercise,addExercise, addable}: ExerciseItemProps): React.ReactElement {
    const navigation = useNavigate()
    const handleAdd = () => {
        if (addExercise) addExercise(exercise);
        navigation(ROUTES.WORKOUT_CREATE);
    }

    return <ComponentContainer className={"flex-row gap-2 px-2 items-center"}>
        <div className={"img-container h-20 w-20 rounded"}>
        <img src={exercise.gif_url} className={"w-full h-full object-cover rounded"} alt={exercise.name}/>
        </div>
        <div className={"w-full h-full flex-1 self-start"}>
            <h2>{exercise.name}</h2>
            </div>
        {addable ?
            <button onClick={handleAdd} className={"rounded-full bg-accent w-fit h-fit p-2"}><Add/></button>
        :
            <></>
        }
    </ComponentContainer>
}