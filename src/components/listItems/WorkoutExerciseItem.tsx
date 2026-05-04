import { useNavigate } from "react-router-dom";
import {ROUTES} from "../../types/consts.ts";

interface WorkoutExerciseItemProps {
  // id: string;
  // index: number;
  name: string;
  gif: string;
  exerciseId: string;
}

export default function WorkoutExerciseItem({
  // id,
  // index,
  name,
  gif,
  exerciseId,
}: WorkoutExerciseItemProps) {
  const navigate = useNavigate();
  // const [element, setElement] = useState<HTMLElement | null>(null);
  // const handleRef = useRef<HTMLButtonElement | null>(null);
  // const { isDragging } = useSortable({ id, index, element, handle: handleRef });


  return <li className={"w-full h-fit bg-components flex flex-row rounded cursor-pointer"} onClick={(_e) => {
    navigate(`${ROUTES.EXERCISES}/${exerciseId}`,{state: {addable:false}});
  }}>
    <div className={"w-24 h-24"}>
      <img src={gif} alt={name} loading={"lazy"} decoding={"async"} className={"rounded-l"}/>
    </div>
    <div className={"flex-col flex flex-1 py-4 px-2"}>
      <h3 className={"text-textcolor text-l font-medium"}>{name}</h3>
    </div>
  </li>
}
