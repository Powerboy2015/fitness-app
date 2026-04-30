import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check"
import { useState } from "react";
import {Remove} from "@mui/icons-material";
import {WorkoutOutletContext} from "../routers/WorkoutRoutes.tsx";
import {useOutletContext} from "react-router-dom";
import {Iworkout} from "../../context/WorkoutContext.tsx";

export default function ExerciseItem({
  name,
  gif,
  id,
  selected
}: {
  name: string;
  id : string;
  gif: string;
  selected: boolean;
}) {
  const {setTempWorkout} = useOutletContext<WorkoutOutletContext>();

    const onAdd = () => {
      const exercise: Iworkout = {
        id,
        name,
        gif
      };
      setTempWorkout(prev => {
        return {...prev, exercises: [...prev.exercises,exercise]}
      })
    }

    const onRemove = () => {
      setTempWorkout(prev => ({
        ...prev,
        exercises: prev.exercises.filter(e => e.id !== id)
      }));
    };


    return <li className={"w-full h-fit bg-components flex flex-row rounded"}>
        <div className={"w-24 h-24"}>
            <img src={gif} alt={name} loading={"lazy"} decoding={"async"} className={"rounded-l"}/>
        </div>
        <div className={"flex-col flex flex-1 py-4 px-2"}>
            <h3 className={"text-textcolor text-l font-medium"}>{name}</h3>
        </div>
        <AddButton enabled={true} state={selected ? "added":"notAdded"}
                   onAddClick={() => {onAdd()}}
                   onRemoveClick={() => {onRemove()}}
        />
    </li>
}





interface AddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  enabled?: boolean
  state?: "notAdded"|"added";
  onAddClick?: () => void;
  onRemoveClick?: () => void;
}

/**
 * SIngle use element just for here, but to simply split up the code.
 */
function AddButton({state="notAdded",enabled=false, onAddClick, onRemoveClick, ...props}:AddButtonProps) {
  const [hovering,isHovering] = useState<boolean>(false);
  const [innerState,setInnerState] = useState<"added"|"notAdded">(state);
  const [frozen,isFrozen] = useState<boolean>(false);

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setInnerState("added");

    isFrozen(true);
    setTimeout(() => isFrozen(false),1000);

    if (onAddClick) {
      onAddClick();
    }
  }

  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setInnerState("notAdded");
    if (onRemoveClick) {
      onRemoveClick();
    }
  }

  if(!enabled) return null;

  if (innerState === "notAdded")
  return <button {...props} onClick={handleAddClick} className={"flex items-center h-24 px-1 bg-accent rounded-r hover:bg-accent-hover active:bg-accent-pressed"}>
      <AddIcon/>
    </button>

  if (innerState=="added")
    return <button {...props} onClick={handleRemoveClick} onPointerEnter={()=> isHovering(true)} onPointerLeave={() => isHovering(false)} className={"flex items-center h-24 px-1 bg-button-start rounded-r active:bg-accent-pressed " + (!frozen ? "hover:bg-button-stop":null)}>
      {hovering && !frozen ? <Remove/>: <CheckIcon/>}
    </button>
}
